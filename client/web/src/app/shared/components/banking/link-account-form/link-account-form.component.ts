import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { BankingService } from 'src/app/services/banking/banking.service';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Component({
  selector: 'app-link-account-form',
  templateUrl: './link-account-form.component.html',
  styleUrls: ['./link-account-form.component.scss']
})
export class LinkAccountFormComponent implements OnInit {

  isSubmitting: boolean = false;
  errors: string[];
  done: boolean;

  linkAccountForm: FormGroup;
  @Output() accountCreatedEmitter = new EventEmitter<BankAccount>();

  constructor(private fb: FormBuilder, private bankingService: BankingService) { }

  ngOnInit() {
    this.linkAccountForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      balance: new FormControl(null, [Validators.required])
    })

    this.linkAccountForm.valueChanges.subscribe(() => {
      this.done = false;
    })
  }

  onCreateAccount(): void {
    if (!this.linkAccountForm.valid) return;

    this.isSubmitting = true;
    this.done = false;

    this.errors = null;

    setTimeout(() => {
      this.bankingService.createBankAccount(this.linkAccountForm.value)
        .then((bankAccount: BankAccount) => {
          this.linkAccountForm.markAsPristine()
          this.accountCreatedEmitter.emit(bankAccount);
          this.linkAccountForm.reset();
          this.done = true;
        })
        .catch((error: ClientResponse) => {
          this.errors = error.messages
        })
        .finally(() => this.isSubmitting = false)
    }, 300);
  }

}
