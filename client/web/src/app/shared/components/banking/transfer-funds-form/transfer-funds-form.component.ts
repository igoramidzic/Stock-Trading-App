import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankingService } from 'src/app/services/banking/banking.service';

@Component({
  selector: 'app-transfer-funds-form',
  templateUrl: './transfer-funds-form.component.html',
  styleUrls: ['./transfer-funds-form.component.scss']
})
export class TransferFundsFormComponent implements OnInit {

  @Input() bankAccounts: BankAccount[];

  isSubmitting: boolean = false;
  errors: string[];
  done: boolean;

  transferForm: FormGroup;
  @Output() transferCompleteEmitter = new EventEmitter<AccountTransfer>();

  constructor(private fb: FormBuilder, private bankingService: BankingService) { }

  ngOnInit() {
    this.transferForm = this.fb.group({
      from: new FormControl(this.bankAccounts.length > 0 ? this.bankAccounts[0]._id : null, [Validators.required]),
      to: new FormControl('123', [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    })

    this.transferForm.valueChanges.subscribe(() => {
      this.done = false;
    })
  }

  onCreateAccount(): void {
    if (!this.transferForm.valid) return;

    this.isSubmitting = true;
    this.done = false;

    this.errors = null;

    setTimeout(() => {
      this.isSubmitting = false;
      this.transferForm.controls['amount'].reset();
      this.done = true;
    }, 300);
  }
}

export interface AccountTransfer {
  from: BankAccount;
  to: BankAccount;
  amount: number;
}