import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getBankAccount } from "../../../api/queryHandlers/bankAccount/bankAccountQueryHandlers";
import { Transfer } from "../../../models/transfer/transfer";
import { createTransfer } from "../../../api/commandHandlers/transfer/transferCommandHandlers";
import { BankAccountDocument } from "../../../models/bank-account/bank-account";
import mongoose from "mongoose";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { AccountQuery } from "../../../api/queries/account/accountQueries";
import { AccountDocument } from "../../../models/account/account";

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
    const bankAccount: BankAccountDocument = await getBankAccount(transfer.bankAccountId, req.user._id);

    console.log(bankAccount);

    if (!bankAccount)
        errors.push("Bank account does not exist.");
    else if (transfer.isDeposit && bankAccount.balance < transfer.amount)
        errors.push("Not enough funds in " + bankAccount.name + ".")

    const account: AccountDocument = await getAccount(new AccountQuery(req.user._id));

    if (!account)
        errors.push("Batman account was not found. Delete your account.");
    else if (!transfer.isDeposit && account.balance < transfer.amount)
        errors.push("Not enough funds in Batman.")

    if (errors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, errors));

    createTransfer(req.user._id, transfer, account, bankAccount)
        .then((result: any) => {
            return res.status(200).json(new ClientResponse(true, result))
        })
        .catch(() => {
            return serverError(res)
        })
});

module.exports = routes;