import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getPortfolio, getOwnedStockInPortfolio } from "../../../api/queryHandlers/portfolio/portfolioQueryHandlers";
import { PortfolioDocument, PortfolioObj } from "../../../models/portfolio/portfolio";
import { stockDetailsByIdQueryHandler } from "../../../api/queryHandlers/stockDetails/stockDetailsQueryHandlers";
import { StockDetailsDocument, OwnedStockDocument, StockDetails } from "../../../models/stock/stockDetails";
import { AccountDocument } from "../../../models/account/account";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { buyStock, sellStock } from "../../../api/commandHandlers/transaction/transactionCommandHandlers";
import { Quote } from "iexcloud_api_wrapper";
import * as iex from 'iexcloud_api_wrapper';
import { addWatchStock } from "../../../api/commandHandlers/watching/watchingCommandHandlers";
import { getIfWatchingStock } from "../../../api/queryHandlers/watching/watchingQueryHandlers";
import { completeTutorialItem } from "../../../api/commandHandlers/tutorial/tutorialCommandHandlers";
import { getTutorialItem } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";
import { TutorialItems } from "../../../models/tutorial/tutorialModel";

const routes: Router = Router()

/**
 * Get portfolio
 */
routes.get("/", async (req: Request, res: Response) => {
    let portfolio;

    try {
        portfolio = await getPortfolio(req.user._id);
    } catch (e) {
        return serverError(res);
    }

    let totalStockValue = 0;
    let stockDetails: any[] = [];

    for (let i = 0; i < portfolio.stocks.length; i++) {
        let stockQuote = await iex.quote(portfolio.stocks[i].stock.symbol);
        stockDetails.push({ ...portfolio.stocks[i].toJSON(), quote: stockQuote })
        totalStockValue += portfolio.stocks[i].quantity * stockQuote.latestPrice;
    }

    totalStockValue = Math.round(totalStockValue * 100) / 100;

    const portfolioResult: PortfolioObj = {
        totalStockValue,
        stocks: stockDetails
    }

    return res.status(200).json(new ClientResponse(true, { portfolio: portfolioResult }))

});

/**
 * Get OwnedStock from Portfolio
 */
routes.get("/ownedstock/:symbol", async (req: Request, res: Response) => {
    const symbol: string = req.params.symbol;

    let portfolio;
    let ownedStock;

    try {
        portfolio = await getPortfolio(req.user._id);
        ownedStock = await getOwnedStockInPortfolio(portfolio, symbol);
    } catch (error) {
        return serverError(res);
    }

    if (ownedStock)
        return res.status(200).json(new ClientResponse(true, { ownedStock }))
    else
        return res.status(200).json(new ClientResponse(true, { ownedStock: null }, ["Stock not found in portfolio."]));
});

/**
 * Buy stock
 */
routes.post("/buy", async (req: Request, res: Response) => {
    const { stockId, quantity } = req.body;

    let stockDetails: StockDetailsDocument;
    let portfolio: PortfolioDocument;
    let account: AccountDocument;

    try {
        stockDetails = await stockDetailsByIdQueryHandler(stockId)
        portfolio = await getPortfolio(req.user._id)
        account = await getAccount(req.user._id)
    }
    catch {
        return serverError(res);
    }

    if (!portfolio || !account)
        return serverError(res);

    if (!stockDetails)
        return res.status(404).json(new ClientResponse(false, null, ['Stock not found.']));

    // Get stock from IEX
    const stockQuote: Quote = await iex.quote(stockDetails.symbol);
    const price: number = stockQuote.latestPrice;

    if (account.balance < price * quantity)
        return res.status(400).json(new ClientResponse(false, null, ['Not enough funds in your account.']));

    buyStock(req.user._id, account, stockDetails, portfolio, quantity, price)
        .then(async (transaction: PortfolioDocument) => {
            try {
                if (!await getIfWatchingStock(req.user, stockDetails._id))
                    await addWatchStock(req.user, stockDetails);

                await completeTutorialItem(await getTutorialItem(TutorialItems.BuyStock), req.user);
            } catch (error) {
                return serverError(res);
            }

            return res.status(200).json(new ClientResponse(true, { transaction }))
        })
        .catch(() => {
            return serverError(res);
        })
});

/**
 * Sell stock
 */
routes.post("/sell", async (req: Request, res: Response) => {
    const { stockId, quantity } = req.body;

    let stockDetails: StockDetailsDocument;
    let ownedStock: OwnedStockDocument;
    let portfolio: PortfolioDocument;
    let account: AccountDocument;

    try {
        stockDetails = await stockDetailsByIdQueryHandler(stockId)
        portfolio = await getPortfolio(req.user._id)
        account = await getAccount(req.user._id)

        for (let i = 0; i < portfolio.stocks.length; i++) {
            if (portfolio.stocks[i].stock._id.equals(stockDetails._id))
                ownedStock = portfolio.stocks[i];
        }
    }
    catch (e) {
        return serverError(res);
    }

    if (!portfolio || !account)
        return serverError(res);

    if (!stockDetails)
        return res.status(404).json(new ClientResponse(false, null, ['Stock not found.']));

    if (!ownedStock)
        return res.status(404).json(new ClientResponse(false, null, ['You own 0 shares of ' + stockDetails.symbol + "."]));

    if (ownedStock.quantity < quantity)
        return res.status(404).json(new ClientResponse(false, null, ['You own only ' + ownedStock.quantity + ' share' + (ownedStock.quantity > 1 ? 's' : '') + ' of ' + ownedStock.stock.symbol + "."]));

    // Get stock from IEX
    const stockQuote: Quote = await iex.quote(ownedStock.stock.symbol);
    const price: number = stockQuote.latestPrice;

    sellStock(req.user._id, account, ownedStock, portfolio, quantity, price)
        .then(async (transaction: PortfolioDocument) => {
            try {
                await completeTutorialItem(await getTutorialItem(TutorialItems.SellStock), req.user);
            } catch (error) {
                return serverError(res);
            }
            return res.status(200).json(new ClientResponse(true, { transaction }))
        })
        .catch(() => {
            return serverError(res);
        })
});

module.exports = routes;