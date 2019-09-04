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