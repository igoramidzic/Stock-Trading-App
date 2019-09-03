import mongoose from "mongoose";

export type BankAccount = {
    name?: string;
    accountNumber?: string;
    balance?: number;
}

export type BankAccountDocument = mongoose.Document & {
    name: string;
    accountNumber: string;
    balance: number;
    active: boolean;
    userId: string;
};

const bankAccountSchema = new mongoose.Schema({
    name: { type: String, unique: false },
    accountNumber: { type: String, unique: false },
    balance: { type: Number },
    active: { type: Boolean, default: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

bankAccountSchema.methods.toJSON = function () {
    const bankAccount = this;
    const bankAccountObject = bankAccount.toObject();

    delete bankAccountObject.userId;
    delete bankAccountObject.active;

    return bankAccountObject;
}

export const BankAccount = mongoose.model<BankAccountDocument>("BankAccount", bankAccountSchema);
