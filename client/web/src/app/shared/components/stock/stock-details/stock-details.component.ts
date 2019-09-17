import { Component, OnInit, Input } from '@angular/core';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {

  @Input() stockDetails: StockDetails;

  showMore: boolean;

  constructor() { }

  ngOnInit() {
  }

}
