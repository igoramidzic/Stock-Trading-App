import { Component, OnInit, Input } from '@angular/core';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  @Input() watchlist: { stockDetails: StockDetails, quote: StockQuote }[];

  constructor() { }

  ngOnInit() {
    this.watchlist.sort((a, b) => a.stockDetails.symbol > b.stockDetails.symbol ? 1 : -1)
  }

}
