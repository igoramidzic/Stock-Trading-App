import mongoose from "mongoose";

export type StockDetails = {
    _id?: string;
    symbol?: string;
    quantity?: number;
    exchangev: string;
    name?: string;
    date?: string;
    type?: string;
    region?: string;
    currency?: string;
}

export type StockDetailsDocument = mongoose.Document & {
    symbol: string;
    exchange: string;
    quantity?: number;
    name: string;
    date: string;
    type: string;
    region: string;
    currency: string;
};

export const stockDetailsSchema = new mongoose.Schema({
    symbol: { type: String, unique: true },
    exchange: { type: String },
    name: { type: String },
    date: { type: String },
    type: { type: String },
    region: { type: String },
    currency: { type: String },
}, { timestamps: true });

export type OwnedStock = {
    stock?: StockDetails;
    quantity?: number;
}

export type OwnedStockDocument = mongoose.Document & {
    stock: StockDetails;
    quantity: number;
};

export const ownedStockSchema = new mongoose.Schema({
    stock: { type: mongoose.Types.ObjectId, ref: 'StockDetails', required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true });

export const StockDetails = mongoose.model<StockDetailsDocument>("StockDetails", stockDetailsSchema);
export const OwnedStock = mongoose.model<OwnedStockDocument>("OwnedStock", ownedStockSchema);
