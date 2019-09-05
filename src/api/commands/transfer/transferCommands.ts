import { AccountDocument } from "../../../models/account/account";
import { BankAccountDocument } from "../../../models/bank-account/bank-account";

export class CreateTransferCommand {
    userId: string;
    bankAccountId: string;
    amount: number;
    isBalance: boolean;
};

export class TransferInAccount {
    amount: number;
    account: AccountDocument;
}

export class TransferInBankAccount {
    amount: number;
    bankAccount: BankAccountDocument
}