import { PortfolioDocument, Portfolio } from "../../../models/portfolio/portfolio";

export let getPortfolio = (userId: string): Promise<PortfolioDocument> => new Promise((resolve, reject) => {
    Portfolio.findOne({ user: userId }).populate('ownedStocks').exec((err, portfolio: PortfolioDocument) => {
        resolve(portfolio);
    })
});