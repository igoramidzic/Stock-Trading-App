import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';

@Component({
  selector: 'app-linked-accounts-list',
  templateUrl: './linked-accounts-list.component.html',
  styleUrls: ['./linked-accounts-list.component.scss']
})
export class LinkedAccountsListComponent implements OnInit {

  @Input() bankAccounts: BankAccount[];

  constructor() { }

  ngOnInit() {
  }

  removedAccount(account: BankAccount): void {
    this.bankAccounts = this.bankAccounts.filter(a => a._id != account._id);
  }
}
