import { StockDetails } from '../stock/stockDetails';
import { StockQuote } from '../stock/quote';

export type Portfolio = {
    stocks?: OwnedStock[];
    totalStockValue?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export type OwnedStock = {
    quantity?: number;
    averagePrice?: number;
    stock?: StockDetails;
    quote?: StockQuote;
    createdAt?: Date;
    updatedAt?: Date;
}