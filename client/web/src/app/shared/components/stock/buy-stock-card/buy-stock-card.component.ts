import { Component, OnInit, Input } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models/account/account';

@Component({
  selector: 'app-buy-stock-card',
  templateUrl: './buy-stock-card.component.html',
  styleUrls: ['./buy-stock-card.component.scss']
})
export class BuyStockCardComponent implements OnInit {

  isSubmitting: boolean = false;
  @Input() quote: StockQuote;
  @Input() account: Account;
  shareCountForm: FormGroup;
  estimatedCost: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.shareCountForm = this.fb.group({
      shareCount: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.shareCountForm.controls['shareCount'].valueChanges.subscribe((shareCount: number) => {
      this.estimatedCost = this.quote.latestPrice * shareCount;
    })
  }

  reviewOrder(): void {
    if (this.shareCountForm.invalid)
      return this.shareCountForm.markAllAsTouched();

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
    }, 2000);
  }
}
