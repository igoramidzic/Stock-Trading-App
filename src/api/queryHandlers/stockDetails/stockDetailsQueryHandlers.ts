import { StockDetailsByFragmentQuery } from "../../queries/stockDetail/stockDetailQueries";
import { StockDetailsDocument, StockDetails } from "../../../models/stock/stockDetails";

export let stockDetailsByFragmentQueryHandler = (query: StockDetailsByFragmentQuery) => new Promise((resolve, reject) => {
    StockDetails.find()
        .or(
            [{ symbol: { $regex: query.fragment, $options: "i" } }, // Symbol match
            { name: { $regex: query.fragment, $options: "i" } }]    // Name match
        )
        .limit(6)
        .then((stockDetails: StockDetailsDocument[]) => {
            resolve(stockDetails)
        })
        .catch((err) => {
            reject(err)
        })
});