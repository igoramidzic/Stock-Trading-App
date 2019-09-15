import { Transfer, TransferDocument } from "../../../models/transfer/transfer";
import { AccountDocument, Account } from "../../../models/account/account";
import { BankAccountDocument, BankAccount } from "../../../models/bank-account/bank-account";
import { PortfolioDocument, Portfolio } from "../../../models/portfolio/portfolio";
import { StockDetailsDocument, OwnedStock, OwnedStockDocument } from "../../../models/stock/stockDetails";
import mongoose from 'mongoose';
import { TransactionDocument } from "../../../models/transaction/transactionModel";
import { createTransaction } from "../transaction/transactionCommandHandlers";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";

export let createTransfer = (user: string, transfer: Transfer, account: AccountDocument, bankAccount: BankAccountDocument) =>
    new Promise(async (resolve, reject) => {
        let newTransfer: TransferDocument = await Transfer.create({ user, amount: transfer.amount, bankAccount: transfer.bankAccountId, isDeposit: transfer.isDeposit });

        newTransfer = await newTransfer.populate('bankAccount').execPopulate()

        const updatedAccount = await accountTransfer(transfer.isDeposit ? transfer.amount : transfer.amount * -1, account);

        const updatedBankAccount = await bankAccountTransfer(transfer.isDeposit ? transfer.amount * -1 : transfer.amount, bankAccount);

        resolve({
            ...newTransfer.toJSON(),
            transfer: { account: updatedAccount, bankAccount: updatedBankAccount }
        })
    })

const accountTransfer = (amount: number, account: AccountDocument) =>
    new Promise(async (resolve, reject) => {
        Account.findByIdAndUpdate(account._id, { balance: account.balance + amount }, { new: true })
            .then((updatedAccount: AccountDocument) => {
                resolve(updatedAccount);
            })
            .catch((err: any) => {
                reject(err)
            })
    })

const bankAccountTransfer = (amount: number, account: BankAccountDocument) =>
    new Promise(async (resolve, reject) => {
        BankAccount.findByIdAndUpdate(account._id, { balance: account.balance + amount }, { new: true })
            .then((updatedAccount: BankAccountDocument) => {
                resolve(updatedAccount);
            })
            .catch((err: any) => {
                reject(err)
            })
    })