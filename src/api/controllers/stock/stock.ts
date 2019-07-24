import * as iex from 'iexcloud_api_wrapper';
import { Router, Response, Request } from "express";
import { ClientResponse } from '../../helpers/helpers'
import app from '../../../app'
import { Socket } from 'socket.io';
import symbols from './stock-symbol-list';
import { StockDetails } from "./../../../models/stock/stockDetails";

const routes: Router = Router();

/**
 * Get
 */
routes.get("/search/:partial", (req: Request, res: Response) => {
    const partial = req.params.partial;

    const regexp = new RegExp(partial, 'i');
    let stocks = symbols.filter((stock: StockDetails) => {
        return regexp.test(stock.symbol) || regexp.test(stock.name)
    })

    stocks.sort((a, b) => a.symbol > b.symbol ? 1 : -1)

    stocks = stocks.slice(0, 5);

    const response = new ClientResponse(true, { stocks })

    res.status(200).json(response)
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

module.exports = routes;