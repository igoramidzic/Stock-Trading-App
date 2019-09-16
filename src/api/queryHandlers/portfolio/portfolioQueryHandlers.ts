import { PortfolioDocument, Portfolio } from "../../../models/portfolio/portfolio";
import { OwnedStockDocument } from "../../../models/stock/stockDetails";

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

export let getOwnedStockInPortfolio = (portfolio: PortfolioDocument, symbol: string): Promise<OwnedStockDocument> => new Promise((resolve, reject) => {
    const ownedStock: OwnedStockDocument = portfolio.stocks.filter(s => s.stock.symbol.toLowerCase() == symbol.toLowerCase())[0]
    resolve(ownedStock);
});