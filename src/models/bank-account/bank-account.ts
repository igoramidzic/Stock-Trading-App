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
    userId: string;
};

const bankAccountSchema = new mongoose.Schema({
    name: { type: String, unique: false },
    accountNumber: { type: String, unique: false },
    balance: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

bankAccountSchema.methods.toJSON = function () {
    const bankAccount = this;
    const bankAccountObject = bankAccount.toObject();

    delete bankAccountObject.userId;

    return bankAccountObject;
}

export const BankAccount = mongoose.model<BankAccountDocument>("BankAccount", bankAccountSchema);
