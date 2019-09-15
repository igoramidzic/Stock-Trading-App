import { TransactionDocument, Transaction } from "../../../models/transaction/transactionModel";

export let getTransactions = (userId: string): Promise<TransactionDocument[]> => new Promise((resolve, reject) => {
    Transaction.find({ user: userId }).sort('-createdAt').populate('stock')
        .exec((err, transactions: TransactionDocument[]) => {
            if (err)
                reject(err);
            resolve(transactions);
        })
});