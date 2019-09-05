import { BankAccountsQuery } from "../../../api/queries/bankaccount/bankAccountQueries";
import { BankAccount, BankAccountDocument } from "../../../models/bank-account/bank-account";

export let getBankAccounts = (query: BankAccountsQuery): Promise<BankAccountDocument[]> => new Promise((resolve, reject) => {
    BankAccount.find({ ...query, active: true }).sort('name accountNumber')
        .then((bankAccounts: BankAccountDocument[]) => {
            resolve(bankAccounts);
        })
        .catch((err: any) => {
            reject(err);
        });
});

export let getBankAccount = (_id: string, userId: string): Promise<BankAccountDocument> => new Promise((resolve, reject) => {
    BankAccount.findById({ _id, userId })
        .then((bankAccount: BankAccountDocument) => {
            resolve(bankAccount);
        })
        .catch((err: any) => {
            reject(err);
        });
});