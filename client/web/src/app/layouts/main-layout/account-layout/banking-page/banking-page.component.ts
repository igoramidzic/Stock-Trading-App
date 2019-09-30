import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { Account } from '../../../../core/models/account/account';
import { ActivatedRoute } from '@angular/router';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-banking-page',
  templateUrl: './banking-page.component.html',
  styleUrls: ['./banking-page.component.scss']
})
export class BankingPageComponent implements OnInit {

  bankAccounts: BankAccount[];
  account: Account;
  accountRemovedMessage: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.bankAccounts = this.route.snapshot.data.bankAccounts;
    this.account = this.route.snapshot.data.account
  }

  accountCreated(bankAccount: BankAccount): void {
    this.bankAccounts.push(bankAccount);
    this.accountRemovedMessage = false;
  }

  accountDeleted(bankAccount: BankAccount): void {
    this.bankAccounts = this.bankAccounts.filter(a => a._id != bankAccount._id);
    this.accountRemovedMessage = true;
  }

  transferCompleted(transfer: Transfer): void {
    const i = this.bankAccounts.findIndex(b => b._id == transfer.bankAccount._id);
    this.bankAccounts[i] = transfer.bankAccount
    this.account = transfer.account;
  }
}
