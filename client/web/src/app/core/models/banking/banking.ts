import { Account } from '../../models/account/account';

export interface BankAccount extends Account {
    name: string;
    accountNumber: string;
    active?: boolean;
}