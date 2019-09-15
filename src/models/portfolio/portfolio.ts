import mongoose, { Schema } from "mongoose";
import { OwnedStock, OwnedStockDocument } from "../stock/stockDetails";

export type PortfolioObj = {
    totalStockValue?: number;
    stocks?: OwnedStock[];
}

export type PortfolioDocument = mongoose.Document & {
    stocks: OwnedStockDocument[];
};

const portfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    stocks: [{ type: Schema.Types.ObjectId, ref: 'OwnedStock' }]
}, { timestamps: true });

portfolioSchema.methods.toJSON = function () {
    const portfolio = this;
    const portfolioObject = portfolio.toObject();

    delete portfolioObject.user;

    return portfolioObject;
}

export const Portfolio = mongoose.model<PortfolioDocument>("portfolio", portfolioSchema);
