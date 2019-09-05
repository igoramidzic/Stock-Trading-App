import { Transfer, TransferDocument } from "../../../models/transfer/transfer";
import { AccountDocument } from "../../../models/account/account";
import { getAccount } from "../../../api/queryHandlers/account/accountQueryHandlers";
import { AccountQuery } from "../../../api/queries/account/accountQueries";

export let createTransfer = (user: string, transfer: Transfer, accountId: string) =>
    new Promise(async (resolve, reject) => {
        let newTransfer: TransferDocument = await Transfer.create({ user, amount: transfer.amount, bankAccount: transfer.bankAccountId, isDeposit: transfer.isDeposit });

        newTransfer = await newTransfer.populate('bankAccount').execPopulate()

        const account: AccountDocument = await getAccount(new AccountQuery(user, accountId));


    })