import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getBankAccount } from "../../../api/queryHandlers/bankAccount/bankAccountQueryHandlers";
import { Transfer, TransferDocument } from "../../../models/transfer/transfer";
import { createTransfer } from "../../../api/commandHandlers/transfer/transferCommandHandlers";
import { BankAccountDocument } from "../../../models/bank-account/bank-account";
import mongoose from "mongoose";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { AccountDocument } from "../../../models/account/account";
import { getTransfers } from "../../../api/queryHandlers/transfer/transferQueryHandlers";
import { TutorialItems } from "../../../models/tutorial/tutorialModel";
import { getTutorialItem } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";
import { TutorialItemDocument } from "../../../models/tutorial/tutorialModel";
import { completeTutorialItem } from "../../../api/commandHandlers/tutorial/tutorialCommandHandlers";

const routes: Router = Router()

/**
 * Get transfers
 */
routes.get("/", async (req: Request, res: Response) => {
    getTransfers(req.user._id)
        .then((transfers: TransferDocument[]) => {
            return res.status(200).json(new ClientResponse(true, { transfers }))
        })
        .catch((err: any) => {
            console.log(err)
            return serverError(res)
        })
});

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

    if (!bankAccount)
        errors.push("Bank account does not exist.");
    else if (transfer.isDeposit && bankAccount.balance < transfer.amount)
        errors.push("Not enough funds in " + bankAccount.name + ".")

    const account: AccountDocument = await getAccount(req.user._id);

    if (!account)
        errors.push("Batman account was not found. Delete your account.");
    else if (!transfer.isDeposit && account.balance < transfer.amount)
        errors.push("Not enough funds in Batman.")

    if (errors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, errors));

    let transferDetails: TransferDocument;
    let tutorialItem: TutorialItemDocument;

    try {
        transferDetails = await createTransfer(req.user._id, transfer, account, bankAccount);
        if (!transferDetails)
            return serverError(res);

        tutorialItem = await getTutorialItem(TutorialItems.TransferFunds);
        await completeTutorialItem(tutorialItem, req.user);
    } catch (error) {
        return serverError(res);
    }

    return res.status(200).json(new ClientResponse(true, transferDetails))
});

module.exports = routes;