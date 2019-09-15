import { Portfolio, PortfolioDocument } from "../../../models/portfolio/portfolio"

export let createPortfolio = (userId: string) =>
    new Promise((resolve, reject) => {
        Portfolio.create({ user: userId })
            .then((portfolio: PortfolioDocument) => {
                resolve(portfolio)
            })
            .catch((error: any) => {
                reject(error)
            })
    })