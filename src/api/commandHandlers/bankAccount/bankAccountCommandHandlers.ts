import { BankAccount, BankAccountDocument } from '../../../models/bank-account/bank-account';

export let createBankAccount = (bankAccount: BankAccount, userId: string) =>
    new Promise((resolve, reject) => {
        BankAccount.create({ ...bankAccount, userId })
            .then((newBankAccount: BankAccountDocument) => {
                resolve(newBankAccount)
            })
            .catch((error: any) => {
                console.log(error)
                reject(error)
            })
    })

export let deleteBankAccount = (bankAccount: BankAccountDocument) =>
    new Promise((resolve, reject) => {
        BankAccount.findByIdAndDelete(bankAccount._id)
            .then((bankAccountRes: BankAccountDocument) => {
                resolve(bankAccountRes)
            })
            .catch((error: any) => {
                reject(error)
            })
    })