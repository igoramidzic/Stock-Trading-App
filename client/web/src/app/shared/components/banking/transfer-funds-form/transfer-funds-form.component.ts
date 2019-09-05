import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { Account } from '../../../../core/models/account/account';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankingService } from 'src/app/services/banking/banking.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-transfer-funds-form',
  templateUrl: './transfer-funds-form.component.html',
  styleUrls: ['./transfer-funds-form.component.scss']
})
export class TransferFundsFormComponent implements OnInit {

  @Input() bankAccounts: BankAccount[];
  @Input() account: Account;

  isSubmitting: boolean = false;
  errors: string[];
  done: boolean;

  transferForm: FormGroup;
  @Output() transferCompleteEmitter = new EventEmitter<Transfer>();

  constructor(private fb: FormBuilder, private transferService: TransferService) { }

  ngOnInit() {
    this.transferForm = this.fb.group({
      from: new FormControl(this.bankAccounts.length > 0 ? this.bankAccounts[0]._id : null, [Validators.required]),
      to: new FormControl(this.account._id, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0.01)])
    })

    this.transferForm.valueChanges.subscribe(() => {
      this.done = false;
    })

    this.transferForm.controls['from'].valueChanges.subscribe((value) => {
      this.selectFrom();
    })

    this.transferForm.controls['to'].valueChanges.subscribe(() => {
      this.selectTo();
    })
  }

  onCreateAccount(): void {
    if (!this.transferForm.valid) return;

    this.isSubmitting = true;
    this.done = false;

    this.errors = null;

    const bankAccountId = this.transferForm.controls['from'].value == this.account._id ? this.transferForm.controls['to'].value : this.transferForm.controls['from'].value;
    const isDeposit = this.transferForm.controls['from'].value == this.account._id ? false : true;
    const transferDetails: Transfer = {
      bankAccountId: bankAccountId,
      amount: this.transferForm.controls['amount'].value,
      isDeposit: isDeposit
    };

    this.transferService.createTransfer(transferDetails)
      .then((transfer: Transfer) => {
        this.transferForm.controls['amount'].reset();
        this.done = true;
        this.transferCompleteEmitter.emit(transfer);
      })
      .catch((error) => {
        this.errors = error.messages
      })
      .finally(() => {
        this.isSubmitting = false;
      })
  }

  selectFrom(): void {
    const from = this.transferForm.controls['from']
    const to = this.transferForm.controls['to']

    if (from.value == to.value || from.value != this.account._id)
      if (from.value == this.account._id)
        to.setValue(this.bankAccounts[0]._id)
      else
        to.setValue(this.account._id)
  }

  selectTo(): void {
    const from = this.transferForm.controls['from']
    const to = this.transferForm.controls['to']

    if (to.value == from.value || to.value != this.account._id)
      if (to.value == this.account._id)
        from.setValue(this.bankAccounts[0]._id)
      else
        from.setValue(this.account._id)
  }
}

export interface AccountTransfer {
  from: BankAccount;
  to: BankAccount;
  amount: number;
}