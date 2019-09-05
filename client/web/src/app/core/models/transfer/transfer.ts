import { BankAccount } from '../banking/banking';

export type Transfer = {
    bankAccountId: string;
    isDeposit: boolean;
    amount: number;
    bankAccount?: BankAccount
}