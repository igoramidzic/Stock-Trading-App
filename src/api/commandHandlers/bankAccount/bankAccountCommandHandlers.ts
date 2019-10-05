import { BankAccount, BankAccountDocument } from '../../../models/bank-account/bank-account';

export let createBankAccount = (bankAccount: BankAccount, userId: string): Promise<BankAccountDocument> =>
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
        BankAccount.findByIdAndUpdate(bankAccount._id, { active: false })
            .then((bankAccountRes: BankAccountDocument) => {
                resolve(bankAccountRes)
            })
            .catch((error: any) => {
                reject(error)
            })
    })