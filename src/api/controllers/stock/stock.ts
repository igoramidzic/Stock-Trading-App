import * as iex from 'iexcloud_api_wrapper';
import { Router, Response, Request } from "express";
import { ClientResponse } from '../../helpers/helpers'
import app from '../../../app'
import { Socket } from 'socket.io';
import { StockDetails, StockDetailsDocument } from "./../../../models/stock/stockDetails";
import { stockDetailsByFragmentQueryHandler } from '../../queryHandlers/stockDetails/stockDetailsQueryHandlers';
import { StockDetailsByFragmentQuery } from '../../queries/stockDetail/stockDetailQueries';

const routes: Router = Router();

/**
 * Get
 */
routes.get("/search/:partial", (req: Request, res: Response) => {
    const partial = req.params.partial;

    stockDetailsByFragmentQueryHandler(new StockDetailsByFragmentQuery(partial))
        .then((stockDetails: StockDetailsDocument[]) => {
            return res.status(200).json(new ClientResponse(true, { stocks: stockDetails }))
        })
        .catch((err) => {
            return res.status(200).json(null)
        })
});

/**
 * Get stock quote
 */
routes.get("/quote/:symbol", (req: Request, res: Response) => {
    const io: Socket = app.get('socketio')

    iex.quote(req.params.symbol)
        .then((quote: iex.Quote) => {
            const response = new ClientResponse(true, { quote })
            return res.status(200).json(response);
        })
        .catch((err) => {
            const response = new ClientResponse(false, null)
            response.addMessage("Symbol not found");
            return res.status(404).json(response);
        })
});

/**
 * Populate stock collection
 */
routes.get("/populate-stock-collection", (req: Request, res: Response) => {
    iex.marketSymbols()
        .then((value) => {
            StockDetails.collection.insertMany(value)
                .then(() => {
                    res.status(200).json(new ClientResponse(true, null))
                })
                .catch(() => {
                    const response: ClientResponse = new ClientResponse(false, null);
                    response.addMessage("Collection might already be populated")
                    res.status(500).json(response)
                })
        })
        .catch((err) => {
            const response: ClientResponse = new ClientResponse(false, null);
            response.addMessage("Collection might already be populated")
            res.status(500).json(response)
        })

});

module.exports = routes;