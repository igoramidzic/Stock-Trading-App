import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent implements OnInit {

  isSubmitting: boolean = false;
  transferForm: FormGroup;
  estimatedCost: number = 0;
  transferType: TransferType = TransferType.Deposit;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.transferForm = this.fb.group({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0.01)])
    })
  }

  reviewTransfer(): void {
    if (this.transferForm.invalid)
      return this.transferForm.markAllAsTouched();

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }

}

enum TransferType {
  Deposit = 1,
  Withdrawl = 2
}