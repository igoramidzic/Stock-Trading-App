import { Component, OnInit, Input } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-losers-list',
  templateUrl: './losers-list.component.html',
  styleUrls: ['./losers-list.component.scss']
})
export class LosersListComponent implements OnInit {
  list: StockQuote[];
  loading: boolean;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.topLosersList.subscribe((topGainers: StockQuote[]) => {
      this.list = topGainers;
    })

    this.updateList();
  }

  updateList(): void {
    this.loading = true;
    this.stockService.updateLosers()
      .finally(() => this.loading = false);
  }

  get emptyStockList(): StockQuote[] {
    let list: StockQuote[] = new Array(!this.list ? 10 : this.list.length);
    return list;
  }
}
