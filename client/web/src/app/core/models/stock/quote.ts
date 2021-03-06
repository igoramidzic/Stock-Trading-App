export type StockQuote = {
    symbol: string;
    companyName: string;
    calculationPrice: string;
    open: number;
    openTime: string;
    close: number;
    closeTime: string;
    high: number;
    low: number;
    latestPrice: number;
    latestSource: string;
    latestTime: string;
    latestUpdate: Date;
    latestVolume: number;
    iexRealtimePrice: number;
    iexRealtimeSize: number;
    iexLastUpdated: number;
    delayedPrice: number;
    delayedPriceTime: number;
    extendedPrice: number;
    extendedChange: number;
    extendedChangePercent: number;
    extendedPriceTime: number;
    previousClose: number;
    change: number;
    changePercent: number;
    iexMarketPercent: number;
    iexVolume: number;
    avgTotalVolume: number;
    iexBidPrice: number;
    iexBidSize: number;
    iexAskPrice: number;
    iexAskSize: number;
    marketCap: number;
    week52High: number;
    week52Low: number;
    ytdChange: number;
    primaryExchange: string;
    previousVolume: any;
    volume: number;
    peRatio: number;
    lastTradeTime: number;
}