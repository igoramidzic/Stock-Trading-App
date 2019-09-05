import mongoose from "mongoose";

export type Transfer = {
    bankAccountId?: string;
    amount?: number;
    isDeposit?: boolean;
}

export type TransferDocument = mongoose.Document & {
    bankAccount?: string;
    amount?: number;
    isDeposit?: boolean;
};

const transferSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    bankAccount: { type: mongoose.Types.ObjectId, ref: 'BankAccount', required: true },
    amount: { type: Number, required: true },
    isDeposit: { type: Boolean, required: true }
}, { timestamps: true });

export const Transfer = mongoose.model<TransferDocument>("transfer", transferSchema);
