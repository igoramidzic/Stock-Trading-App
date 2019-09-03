import { BankAccountsQuery } from "../../../api/queries/bankaccount/bankAccountQueries";
import { BankAccount, BankAccountDocument } from "../../../models/bank-account/bank-account";

export let getBankAccounts = (query: BankAccountsQuery) => new Promise((resolve, reject) => {
    BankAccount.find({ ...query, active: true }).sort('name accountNumber')
        .then((bankAccounts: BankAccountDocument[]) => {
            resolve(bankAccounts);
        })
        .catch(error => {
            console.log(error)
            reject();
        });
});