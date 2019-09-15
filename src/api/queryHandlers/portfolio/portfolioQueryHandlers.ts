import { PortfolioDocument, Portfolio } from "../../../models/portfolio/portfolio";
import { OwnedStockDocument } from "../../../models/stock/stockDetails";
import * as iex from 'iexcloud_api_wrapper';

export let getPortfolio = (userId: string): Promise<PortfolioDocument> => new Promise((resolve, reject) => {
    Portfolio.findOne({ user: userId }).populate(
        {
            path: 'stocks',
            populate: {
                path: 'stock'
            }
        }
    ).exec((err, portfolio: PortfolioDocument) => {
        if (err)
            reject(err);

        resolve(portfolio);
    })
});