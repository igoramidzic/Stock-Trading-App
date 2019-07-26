import mongoose from "mongoose";

export type StockDetailsDocument = mongoose.Document & {
    symbol: string;
    exchange: string;
    name: string;
    date: string;
    type: string;
    region: string;
    currency: string;
};

const stockDetailsSchema = new mongoose.Schema({
    symbol: { type: String, unique: true },
    exchange: { type: String },
    name: { type: String },
    date: { type: String },
    type: { type: String },
    region: { type: String },
    currency: { type: String },
}, { timestamps: true });

stockDetailsSchema.pre("save", function save(next) {
})

export const StockDetails = mongoose.model<StockDetailsDocument>("StockDetails", stockDetailsSchema);
