import * as iex from 'iexcloud_api_wrapper';
import { Router, Response, Request } from "express";
import { ClientResponse } from '../../helpers/helpers'
import { StockDetails, StockDetailsDocument } from "./../../../models/stock/stockDetails";
import { stockDetailsListByFragmentQueryHandler, stockDetailsBySymbolQueryHandler } from '../../queryHandlers/stockDetails/stockDetailsQueryHandlers';
import { StockDetailsByFragmentQuery, StockDetailsBySymbolQuery } from '../../queries/stockDetail/stockDetailQueries';
import { Company, Quote } from 'iexcloud_api_wrapper';

const routes: Router = Router();

/**
 * Get
 */
routes.get("/search/:partial", (req: Request, res: Response) => {
    const partial = req.params.partial;

    stockDetailsListByFragmentQueryHandler(new StockDetailsByFragmentQuery(partial))
        .then((stockDetails: StockDetailsDocument[]) => {
            return res.status(200).json(new ClientResponse(true, { stocks: stockDetails }))
        })
        .catch((err) => {
            return res.status(200).json(null)
        })
});

/**
 * Get stock details
 */
routes.get("/:symbol/details", (req: Request, res: Response) => {
    // const io: Socket = app.get('socketio')

    const symbolPromise: Promise<StockDetailsDocument>
        = stockDetailsBySymbolQueryHandler(new StockDetailsBySymbolQuery(req.params.symbol));
    const quotePromise: Promise<iex.Quote> = iex.quote(req.params.symbol)
    const companyPromise: Promise<iex.Company> = iex.company(req.params.symbol)

    Promise.all([symbolPromise, quotePromise, companyPromise])
        .then((result) => {
            const response = new ClientResponse(true,
                { details: { ...result[0].toJSON(), quote: result[1], company: result[2] } })
            return res.status(200).json(response);
        })
        .catch(() => {
            const response = new ClientResponse(false, null)
            response.addMessage("This stock could not be found.");
            return res.status(404).json(response);
        })
});

/**
 * Get stock quote
 */
routes.get("/:symbol/quote", (req: Request, res: Response) => {
    iex.quote(req.params.symbol)
        .then((quote: Quote) => {
            const response = new ClientResponse(true, { quote })
            return res.status(200).json(response);
        })
        .catch((err) => {
            const response = new ClientResponse(false, null)
            response.addMessage("This stock could not be found.");
            return res.status(404).json(response);
        })
});

/**
 * Get stock company
 */
routes.get("/:symbol/company", (req: Request, res: Response) => {
    iex.company(req.params.symbol)
        .then((company: Company) => {
            const response = new ClientResponse(true, { company })
            return res.status(200).json(response);
        })
        .catch((err) => {
            const response = new ClientResponse(false, null)
            response.addMessage("This stock could not be found.");
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