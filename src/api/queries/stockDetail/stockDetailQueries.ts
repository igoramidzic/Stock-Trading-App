export class StockDetailsByFragmentQuery {
    fragment: string;

    constructor(fragment: string) {
        this.fragment = fragment;
    }
};

export class StockDetailsBySymbolQuery {
    symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }
};