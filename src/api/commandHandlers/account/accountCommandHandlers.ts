import { Account, AccountDocument } from '../../../models/account/account';

export let createAccount = (balance: number, userId: string) =>
    new Promise((resolve, reject) => {
        Account.create({ balance, userId })
            .then((newAccount: AccountDocument) => {
                resolve(newAccount)
            })
            .catch((error: any) => {
                console.log(error)
                reject(error)
            })
    })

export let updateAccountBalance = (account: AccountDocument, balanceChange: number) =>
    new Promise((resolve, reject) => {
        account.update({ balance: account.balance + balanceChange })
            .then((updatedAccount: AccountDocument) => {
                resolve(updatedAccount)
            })
            .catch((error: any) => {
                reject(error)
            })
    })