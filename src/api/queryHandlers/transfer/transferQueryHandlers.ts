import { Transfer, TransferDocument } from "../../../models/transfer/transfer";

export let getTransfers = (userId: string): Promise<TransferDocument[]> => new Promise((resolve, reject) => {
    Transfer.find({ user: userId }).sort('-createdAt').populate('bankAccount')
        .exec((err, transfers: TransferDocument[]) => {
            resolve(transfers);
        })
});