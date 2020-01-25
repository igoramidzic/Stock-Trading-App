import { Component, OnInit, Input } from '@angular/core';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-watch-list-item',
  templateUrl: './watch-list-item.component.html',
  styleUrls: ['./watch-list-item.component.scss']
})
export class WatchListItemComponent implements OnInit {

  @Input() stock: { stockDetails: StockDetails, quote: StockQuote };

  constructor() { }

  ngOnInit() {
  }

}
