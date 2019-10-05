import mongoose from "mongoose";

export enum TutorialItems {
    LinkBankAccount = 1,
    TransferFunds = 2,
    AddStockToWatchlist = 3,
    BuyStock = 4,
    SellStock = 5
}

export type TutorialItem = {
    identifier: number;
    description: string;
    link?: string;
    order: number;
    completed?: boolean;
}

export type TutorialItemDocument = mongoose.Document & {
    identifier: number;
    description: string;
    order: number;
    link?: string;
    completed?: boolean;
};

const tutorialItemSchema = new mongoose.Schema({
    identifier: { type: Number, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    link: { type: String, required: false }
}, { timestamps: true });

export const TutorialItem = mongoose.model<TutorialItemDocument>("TutorialItem", tutorialItemSchema);
