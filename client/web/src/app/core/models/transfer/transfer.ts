import { BankAccount } from '../banking/banking';
import { Account } from '../account/account';

export type Transfer = {
    bankAccountId: string;
    isDeposit: boolean;
    amount: number;
    bankAccount?: BankAccount;
    account?: Account;
    createdAt?: Date;
    updatedAt?: Date;
}