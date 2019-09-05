import { AccountQuery } from "../../../api/queries/account/accountQueries";
import { Account, AccountDocument } from "../../../models/account/account";

export let getAccount = (query: AccountQuery): Promise<AccountDocument> => new Promise((resolve, reject) => {
    Account.findOne(query)
        .then((account: AccountDocument) => {
            console.log(account)
            resolve(account);
        })
        .catch(error => {
            reject();
        });
});