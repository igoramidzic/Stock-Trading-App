import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { BankAccountsQuery } from "../../../api/queries/bankaccount/bankAccountQueries";
import { getBankAccounts } from "../../../api/queryHandlers/bankAccount/bankAccountQueryHandlers";
import { BankAccountDocument, BankAccount } from "../../../models/bank-account/bank-account";
import { createBankAccount, deleteBankAccount } from "../../../api/commandHandlers/bankAccount/bankAccountCommandHandlers";
import mongoose from "mongoose";

const routes: Router = Router()

/**
 * Get bank accounts
 */
routes.get("/", (req: Request, res: Response) => {
    const id: string = req.query.id

    if (id && !mongoose.Types.ObjectId.isValid(id))
        return res.status(200).json(new ClientResponse(true, { bankAccounts: [] }))

    getBankAccounts(new BankAccountsQuery(req.user._id, id))
        .then((bankAccounts: BankAccountDocument[]) => {
            return res.status(200).json(new ClientResponse(true, { bankAccounts: bankAccounts }))
        })
        .catch(() => {
            return serverError(res);
        })
});

/**
 * Create bank account
 */
routes.post("/", (req: Request, res: Response) => {
    const bankAccount: BankAccount = req.body;

    if (bankAccount.name)
        bankAccount.name = bankAccount.name.trim();
    if (bankAccount.accountNumber)
        bankAccount.accountNumber = bankAccount.accountNumber.trim();

    const errors: string[] = [];

    if (!bankAccount.name) errors.push("Name cannot be empty.")
    if (!bankAccount.accountNumber) errors.push("Account number cannot be empty.")
    if (bankAccount.balance != 0 && !bankAccount.balance) errors.push("Balance cannot be empty.")

    if (errors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, errors));

    createBankAccount(bankAccount, req.user._id)
        .then((bankAccountDetails: BankAccountDocument) => {
            return res.status(200).json(new ClientResponse(true, { bankAccount: bankAccountDetails }))
        })
        .catch(() => {
            return serverError(res)
        })
});

/**
 * Create bank account
 */
routes.delete("/:id", (req: Request, res: Response) => {
    const id: string = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json(new ClientResponse(true, null, ["Bank account not found"]))

    getBankAccounts(new BankAccountsQuery(req.user._id, id))
        .then((bankAccounts: BankAccountDocument[]) => {
            if (bankAccounts.length == 0)
                return res.status(404).json(new ClientResponse(true, null, ["Bank account not found"]))

            deleteBankAccount(bankAccounts[0])
                .then((bankAccount: BankAccountDocument) => {
                    return res.status(200).json(new ClientResponse(true, { bankAccount }))
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json(null)
                })
        })
        .catch(() => {
            return serverError(res)
        })
});

module.exports = routes;