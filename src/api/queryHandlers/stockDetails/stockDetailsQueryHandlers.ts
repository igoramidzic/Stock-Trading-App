import { StockDetailsByFragmentQuery, StockDetailsBySymbolQuery } from "../../queries/stockDetail/stockDetailQueries";
import { StockDetailsDocument, StockDetails } from "../../../models/stock/stockDetails";
import * as iex from 'iexcloud_api_wrapper';
import { NewsItem } from "iexcloud_api_wrapper";

export const stockDetailsListByFragmentQueryHandler = (query: StockDetailsByFragmentQuery): Promise<StockDetailsDocument[]> => new Promise((resolve, reject) => {
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

export let stockDetailsBySymbolQueryHandler = (query: StockDetailsBySymbolQuery): Promise<StockDetailsDocument> => new Promise((resolve, reject) => {
    StockDetails.findOne({ symbol: { $regex: new RegExp("^" + query.symbol, "i") } })
        .then((stockDetails: StockDetailsDocument) => {
            resolve(stockDetails)
        })
        .catch((err) => {
            reject(err)
        })
});

export let stockDetailsByIdQueryHandler = (_id: string): Promise<StockDetailsDocument> => new Promise((resolve, reject) => {
    StockDetails.findById(_id)
        .then((stockDetails: StockDetailsDocument) => {
            resolve(stockDetails)
        })
        .catch((err) => {
            reject(err)
        })
});

export const stockNewsQueryHandler = (symbol: string): Promise<NewsItem[]> => new Promise((resolve, reject) => {
    iex.news(symbol)
        .then((news: NewsItem[]) => {
            resolve(news);
        })
        .catch((err: any) => {
            reject(err)
        })
});