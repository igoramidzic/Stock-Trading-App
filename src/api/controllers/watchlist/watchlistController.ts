import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getWatchedStocks, getIfWatchingStock } from "../../queryHandlers/watching/watchingQueryHandlers";
import { StockDetailsDocument, StockDetails } from "../../../models/stock/stockDetails";
import { stockDetailsByIdQueryHandler } from "../../queryHandlers/stockDetails/stockDetailsQueryHandlers";
import mongoose from "mongoose";
import { addWatchStock, removeWatchStock } from "../../commandHandlers/watching/watchingCommandHandlers";
import * as iex from 'iexcloud_api_wrapper';
import { Quote } from "iexcloud_api_wrapper";

const routes: Router = Router()

/**
 * Get watched stocks
 */
routes.get("/", async (req: Request, res: Response) => {
    let watchlist: StockDetailsDocument[] = [];

    const watchlistWithQuote: { stockDetails: StockDetailsDocument, quote?: Quote }[] = [];

    try {
        watchlist = await getWatchedStocks(req.user._id)
    } catch (e) {
        return serverError(res);
    }

    let promiseList: Promise<any>[] = [];

    watchlist.forEach((stock: StockDetailsDocument) => {
        promiseList.push(iex.quote(stock.symbol))
        watchlistWithQuote.push({
            stockDetails: stock
        })
    });

    Promise.all(promiseList)
        .then((quotes: any) => {
            for (let i = 0; i < quotes.length; i++) {
                watchlistWithQuote[i].quote = quotes[i];
            }
            res.status(200).json(new ClientResponse(true, { watchlist: watchlistWithQuote }));
        })
        .catch((err: any) => {
            return serverError(res);
        })
});

/**
 * Get if stock is watched
 */
routes.get("/:stockId", async (req: Request, res: Response) => {
    const { stockId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(stockId))
        return res.status(400).json(new ClientResponse(false, null, ["Invalid Stock ID."]));

    getIfWatchingStock(req.user._id, mongoose.Types.ObjectId(stockId))
        .then((isWatching: boolean) => {
            return res.status(200).json(new ClientResponse(true, { isWatching }))
        })
        .catch(() => {
            return serverError(res)
        })
});

/**
 * Add watch stock
 */
routes.post("/", async (req: Request, res: Response) => {
    const { stockId } = req.body;

    if (!stockId || !mongoose.Types.ObjectId.isValid(stockId))
        return res.status(400).json(new ClientResponse(false, null, ["Stock ID is invalid."]));

    let stock;

    try {
        stock = await stockDetailsByIdQueryHandler(stockId);
    } catch {
        return serverError(res);
    }

    if (!stock)
        return res.status(400).json(new ClientResponse(false, null, ["Stock was not found."]));

    let alreadyWatchingStock: boolean;

    try {
        alreadyWatchingStock = await getIfWatchingStock(req.user._id, stock._id)
    } catch {
        return serverError(res);
    }

    if (alreadyWatchingStock)
        return res.status(400).json(new ClientResponse(false, null, ["Already watching stock."]));

    let watchStocks;

    try {
        watchStocks = await addWatchStock(req.user, stock);
    } catch {
        return serverError(res);
    }

    return res.status(200).json(new ClientResponse(true, { watchStocks }));
});

/**
 * Remove watch stock
 */
routes.delete("/", async (req: Request, res: Response) => {
    const { stockId } = req.body;

    if (!stockId || !mongoose.Types.ObjectId.isValid(stockId))
        return res.status(400).json(new ClientResponse(false, null, ["Stock ID is invalid."]));

    let stock;

    try {
        stock = await stockDetailsByIdQueryHandler(stockId);
    } catch {
        return serverError(res);
    }

    if (!stock)
        return res.status(400).json(new ClientResponse(false, null, ["Stock was not found."]));

    let alreadyWatchingStock: boolean;

    try {
        alreadyWatchingStock = await getIfWatchingStock(req.user._id, stock._id)
    } catch {
        return serverError(res);
    }

    if (!alreadyWatchingStock)
        return res.status(400).json(new ClientResponse(false, null, ["Already not watching stock."]));

    let watchStocks;

    try {
        watchStocks = await removeWatchStock(req.user, stock);
    } catch {
        return serverError(res);
    }

    return res.status(200).json(new ClientResponse(true, { watchStocks }));
});

module.exports = routes;