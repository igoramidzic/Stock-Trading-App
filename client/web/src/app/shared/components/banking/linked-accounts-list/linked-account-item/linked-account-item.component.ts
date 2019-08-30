import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';

@Component({
  selector: 'app-linked-account-item',
  templateUrl: './linked-account-item.component.html',
  styleUrls: ['./linked-account-item.component.scss']
})
export class LinkedAccountItemComponent implements OnInit {

  @Input() bankAccount: BankAccount;
  @Output() removedAccount = new EventEmitter<BankAccount>();
  isSubmitting: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  removeAccount(): void {
    this.isSubmitting = true;
    setTimeout(() => {
      this.removedAccount.emit(this.bankAccount);
      this.isSubmitting = false;
    }, 2000);
  }
}
