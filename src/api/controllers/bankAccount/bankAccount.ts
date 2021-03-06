import { Router, Response, Request } from "express";
import { ClientResponse, serverError } from '../../helpers/helpers'
import { getBankAccounts } from "../../../api/queryHandlers/bankAccount/bankAccountQueryHandlers";
import { BankAccountDocument, BankAccount } from "../../../models/bank-account/bank-account";
import { createBankAccount, deleteBankAccount } from "../../../api/commandHandlers/bankAccount/bankAccountCommandHandlers";
import mongoose from "mongoose";
import { TutorialItemDocument, TutorialItems } from "../../../models/tutorial/tutorialModel";
import { getTutorialItem } from "../../../api/queryHandlers/tutorial/tutorialQueryHandlers";
import { completeTutorialItem } from "../../../api/commandHandlers/tutorial/tutorialCommandHandlers";

const routes: Router = Router()

/**
 * Get bank accounts
 */
routes.get("/", (req: Request, res: Response) => {
    const id: string = req.query.id

    if (id && !mongoose.Types.ObjectId.isValid(id))
        return res.status(200).json(new ClientResponse(true, { bankAccounts: [] }))

    getBankAccounts(req.user._id)
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
routes.post("/", async (req: Request, res: Response) => {
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


    let bankAccountDetails: BankAccountDocument;
    let tutorialItem: TutorialItemDocument;

    try {
        bankAccountDetails = await createBankAccount(bankAccount, req.user._id);
        if (!bankAccountDetails)
            return serverError(res);

        tutorialItem = await getTutorialItem(TutorialItems.LinkBankAccount);
        await completeTutorialItem(tutorialItem, req.user);
    } catch (error) {
        return serverError(res);
    }

    return res.status(200).json(new ClientResponse(true, { bankAccount: bankAccountDetails }))
});

/**
 * Create bank account
 */
routes.delete("/:id", (req: Request, res: Response) => {
    const id: string = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json(new ClientResponse(true, null, ["Bank account not found"]))

    getBankAccounts(req.user._id)
        .then((bankAccounts: BankAccountDocument[]) => {
            if (bankAccounts.length == 0)
                return res.status(404).json(new ClientResponse(true, null, ["Bank account not found"]))

            deleteBankAccount(bankAccounts[0])
                .then((bankAccount: BankAccountDocument) => {
                    return res.status(200).json(new ClientResponse(true, { bankAccount }))
                })
                .catch((err) => {
                    return res.status(500).json(null)
                })
        })
        .catch(() => {
            return serverError(res)
        })
});

module.exports = routes;