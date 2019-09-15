import mongoose from "mongoose";
import { StockDetailsDocument, StockDetails } from "../stock/stockDetails";

export type Transaction = {
    stock: StockDetails;
    price: number;
    quantity: number;
    isBuy: boolean;
}

export type TransactionDocument = mongoose.Document & {
    stock: StockDetailsDocument;
    price: number;
    quantity: number;
    isBuy: boolean;
};

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    stock: { type: mongoose.Types.ObjectId, ref: 'StockDetails', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isBuy: { type: Boolean, required: true }
}, { timestamps: true });

transactionSchema.methods.toJSON = function () {
    const transaction = this;
    const transactionObject = transaction.toObject();

    delete transactionObject.user;

    return transactionObject;
}

export const Transaction = mongoose.model<TransactionDocument>("transaction", transactionSchema);
