import { BankAccount, BankAccountDocument } from "../../../models/bank-account/bank-account";

export let getBankAccounts = (userId: string): Promise<BankAccountDocument[]> =>
    new Promise((resolve, reject) => {
        BankAccount.find({ userId, active: true })
            .sort("name accountNumber")
            .then((bankAccounts: BankAccountDocument[]) => {
                resolve(bankAccounts);
            })
            .catch((err: any) => {
                reject(err);
            });
    });

export let getBankAccount = (_id: string, userId: string): Promise<BankAccountDocument> =>
    new Promise((resolve, reject) => {
        BankAccount.findById({ _id, userId })
            .then((bankAccount: BankAccountDocument) => {
                resolve(bankAccount);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
