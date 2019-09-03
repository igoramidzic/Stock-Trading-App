import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { BankingService } from 'src/app/services/banking/banking.service';

@Component({
  selector: 'app-linked-accounts-list',
  templateUrl: './linked-accounts-list.component.html',
  styleUrls: ['./linked-accounts-list.component.scss']
})
export class LinkedAccountsListComponent implements OnInit {

  @Input() bankAccounts: BankAccount[];
  @Output() accountDeletedEmitter = new EventEmitter<BankAccount>();

  constructor(private bankingService: BankingService) { }

  ngOnInit() {
  }

  removedAccount(account: BankAccount): void {
    this.bankingService.deleteBankAccount(account._id)
      .then((bankAccount: BankAccount) => {
        this.accountDeletedEmitter.emit(bankAccount);
      })
      .catch((error) => {
      })
  }
}
