import { StockDetails } from '../stock/stockDetails';

export type Transaction = {
    stock?: StockDetails;
    price?: number;
    totalPrice?: number;
    quantity?: number;
    isBuy?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}