import { Account, AccountDocument } from "../../../models/account/account";

export let getAccount = (userId: string): Promise<AccountDocument> => new Promise((resolve, reject) => {
    Account.findOne({ userId })
        .then((account: AccountDocument) => {
            resolve(account);
        })
        .catch(error => {
            reject();
        });
});