import mongoose from "mongoose";

export type Account = {
    balance?: number;
}

export type AccountDocument = mongoose.Document & {
    balance: number;
    userId: string;
};

const accountSchema = new mongoose.Schema({
    balance: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

accountSchema.methods.toJSON = function () {
    const bankAccount = this;
    const bankAccountObject = bankAccount.toObject();

    delete bankAccountObject.userId;

    return bankAccountObject;
}

export const Account = mongoose.model<AccountDocument>("Account", accountSchema);
