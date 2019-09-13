import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getPortfolio } from "../../../api/queryHandlers/portfolio/portfolioQueryHandlers";
import { PortfolioDocument, Portfolio } from "../../../models/portfolio/portfolio";
import { buyStock } from "../../../api/commandHandlers/transfer/transferCommandHandlers";
import { stockDetailsByIdQueryHandler } from "../../../api/queryHandlers/stockDetails/stockDetailsQueryHandlers";
import { StockDetailsDocument } from "../../../models/stock/stockDetails";

const routes: Router = Router()

/**
 * Get portfolio
 */
routes.get("/", (req: Request, res: Response) => {
    getPortfolio(req.user._id)
        .then((portfolio: PortfolioDocument) => {
            return res.status(200).json(new ClientResponse(true, { portfolio }))
        })
        .catch(() => {
            return serverError(res);
        })
});

/**
 * Buy stock
 */
routes.post("/buy", async (req: Request, res: Response) => {
    const { stockId, quantity } = req.body;

    let stockDetails: StockDetailsDocument;
    let portfolio: PortfolioDocument;

    try {
        stockDetails = await stockDetailsByIdQueryHandler(stockId)
    }
    catch {
        return res.status(404).json(new ClientResponse(false, null, ["Stock not found."]))
    }

    try {
        portfolio = await getPortfolio(req.user._id)
    }
    catch {
        return res.status(500).json(new ClientResponse(false, null, ["Portfolio not found. Uh oh.."]))
    }

    buyStock(stockDetails, portfolio, quantity, 123.45)
        .then((portfolio: PortfolioDocument) => {
            return res.status(200).json(new ClientResponse(true, { portfolio }))
        })
        .catch(() => {
            return serverError(res);
        })
});

module.exports = routes;