import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { MatDialog } from '@angular/material/dialog';
import { RemoveLinkedAccountDialogComponent } from '../../remove-linked-account-dialog/remove-linked-account-dialog.component';

@Component({
  selector: 'app-linked-account-item',
  templateUrl: './linked-account-item.component.html',
  styleUrls: ['./linked-account-item.component.scss']
})
export class LinkedAccountItemComponent implements OnInit {

  @Input() bankAccount: BankAccount;
  @Output() removedAccount = new EventEmitter<BankAccount>();
  isSubmitting: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RemoveLinkedAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.removeAccount();
    });
  }

  removeAccount(): void {
    this.isSubmitting = true;
    setTimeout(() => {
      this.removedAccount.emit(this.bankAccount);
      this.isSubmitting = false;
    }, 10);
  }
}
