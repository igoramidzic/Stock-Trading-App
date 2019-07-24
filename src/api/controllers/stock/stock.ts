import * as iex from 'iexcloud_api_wrapper';
import { Router, Response, Request } from "express";
import { ClientResponse } from '../../helpers/helpers'
import app from '../../../app'
import { Socket } from 'socket.io';

const routes: Router = Router()

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