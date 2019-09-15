import { StockDetailsDocument, OwnedStockDocument, OwnedStock } from "../../../models/stock/stockDetails";
import mongoose from 'mongoose';
import { Transaction, TransactionDocument } from "../../../models/transaction/transactionModel";
import { AccountDocument } from "../../../models/account/account";
import { updateAccountBalance } from "../account/accountCommandHandlers";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { PortfolioDocument } from "../../../models/portfolio/portfolio";

export let createTransaction = (user: string, account: AccountDocument, stock: StockDetailsDocument, quantity: number, price: number, isBuy: boolean): Promise<TransactionDocument> =>
    new Promise(async (resolve, reject) => {
        let transaction: TransactionDocument;

        if (isBuy && account.balance < price * quantity)
            return reject("Not enough funds in account.");

        try {
            transaction = await Transaction.create({
                user, stock, quantity, price, totalPrice: price * quantity, isBuy
            });
            transaction = await transaction.populate('stock').execPopulate();
            await updateAccountBalance(account, price * quantity * (isBuy ? -1 : 1));
        } catch (e) {
            return reject(e);
        }

        return resolve(transaction);
    })

export let buyStock = (user: string, account: AccountDocument, stock: StockDetailsDocument, portfolio: PortfolioDocument, quantity: number, price: number) =>
    new Promise(async (resolve, reject) => {
        let transaction: TransactionDocument;

        // Get OwnedStock if already in Portfolio
        let ownedStock: OwnedStockDocument;

        for (let i = 0; i < portfolio.stocks.length; i++) {
            if (portfolio.stocks[i].stock._id.equals(stock._id))
                ownedStock = portfolio.stocks[i];
        }

        // If OwnedStock already exists
        if (ownedStock) {
            // Update quantity and average price
            ownedStock.averagePrice =
                Math.round(((ownedStock.averagePrice * ownedStock.quantity + price * quantity) / (ownedStock.quantity + quantity)) * 100) / 100;
            ownedStock.quantity += quantity;

            portfolio.stocks.push(ownedStock);

            // Make transaction { stock, price, quantity }
            try {
                transaction = await createTransaction(user, account, ownedStock.stock, quantity, price, true);
                await ownedStock.save()
            }
            catch (e) {
                reject(e)
            }

            resolve(transaction);
        } else {
            // If OwnedStock does not exist
            // Create OwnedStock with quantity and price
            ownedStock = await OwnedStock.create({ stock, quantity, averagePrice: price });

            // Add to Portfolio
            portfolio.stocks.push(ownedStock);

            // Make transaction { stock, price, quantity }
            try {
                transaction = await createTransaction(user, account, ownedStock.stock, quantity, price, true);
                await ownedStock.save()
            }
            catch (e) {
                reject(e)
            }

            portfolio.save()
                .then((portfolio: PortfolioDocument) => {
                    resolve(transaction);
                })
                .catch((err: any) => {
                    reject(err)
                })
        }
    })

export let sellStock = (user: string, account: AccountDocument, ownedStock: OwnedStockDocument, portfolio: PortfolioDocument, quantity: number, price: number) =>
    new Promise(async (resolve, reject) => {
        let transaction: TransactionDocument;

        // If the user is selling all of the stocks, just remove it entirely.
        if (ownedStock.quantity == quantity)
            try {
                await ownedStock.remove();
                portfolio.stocks = portfolio.stocks.filter(s => !s.stock._id.equals(ownedStock.stock._id))
                await portfolio.save();
            } catch (e) {
                console.log(e)
                reject(e);
            }
        else {
            // Update quantity
            ownedStock.quantity -= quantity;
        }

        // Make transaction { stock, price, quantity }
        try {
            transaction = await createTransaction(user, account, ownedStock.stock, quantity, price, false);
            await ownedStock.save()
        }
        catch (e) {
            console.log(e)
            reject(e)
        }
        resolve(transaction);
    })