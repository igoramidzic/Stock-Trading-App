import mongoose from "mongoose";
import { OwnedStock, ownedStockSchema } from "../stock/stockDetails";

export type Portfolio = {
    stocks: OwnedStock[];
}

export type PortfolioDocument = mongoose.Document & {
    stocks: OwnedStock[];
};

const portfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    stocks: [ownedStockSchema]
}, { timestamps: true });

export const Portfolio = mongoose.model<PortfolioDocument>("portfolio", portfolioSchema);
