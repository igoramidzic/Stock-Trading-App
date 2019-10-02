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

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.topLosersList.subscribe((list: StockQuote[]) => {
      this.list = list;
    })

    if (!this.list)
      this.stockService.updateLosers();
  }

  updateList(): void {
    this.stockService.updateLosers();
  }
}
