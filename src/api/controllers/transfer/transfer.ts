import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { BankAccountsQuery } from "../../../api/queries/bankaccount/bankAccountQueries";
import { getBankAccounts } from "../../../api/queryHandlers/bankAccount/bankAccountQueryHandlers";
import { Transfer, TransferDocument } from "../../../models/transfer/transfer";
import { createTransfer } from "../../../api/commandHandlers/transfer/transferCommandHandlers";
import { BankAccount } from "../../../models/bank-account/bank-account";
import mongoose from "mongoose";

const routes: Router = Router()

/**
 * Create transfer
 */
routes.post("/", async (req: Request, res: Response) => {
    const transfer: Transfer = req.body;

    const errors: string[] = [];

    if (!transfer.amount) errors.push("Amount cannot be empty.")
    if (transfer.isDeposit === undefined || transfer.isDeposit === null)
        errors.push("Must specify if this is a deposit.")
    if (!transfer.bankAccountId || !mongoose.Types.ObjectId.isValid(transfer.bankAccountId)) errors.push("BankAccountId is not valid")

    // Check if bank account exists
    await getBankAccounts(new BankAccountsQuery(req.user._id, transfer.bankAccountId))
        .then((bankAccounts: BankAccount[]) => {
            if (bankAccounts.length == 0)
                errors.push("Bank account cannot be found.")
        })
        .catch(() => {
            return serverError(res);
        })

    if (errors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, errors));

    createTransfer(req.user._id, transfer, "something temporary here")
        .then((transfer: TransferDocument) => {
            return res.status(200).json(new ClientResponse(true, { transfer }))
        })
        .catch(() => {
            return serverError(res)
        })
});

module.exports = routes;