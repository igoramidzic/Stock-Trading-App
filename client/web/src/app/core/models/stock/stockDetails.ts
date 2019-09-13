import { StockQuote } from './quote';
import { StockCompany } from './company';

export type StockDetails = {
    _id?: string;
    symbol: string;
    exchange: string;
    name: string;
    date: string;
    type: string;
    iexId: string;
    region: string;
    currency: string;
    isEnabled: boolean;
    quote: StockQuote;
    company: StockCompany;
}