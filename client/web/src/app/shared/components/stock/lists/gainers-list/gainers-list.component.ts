import { Component, OnInit, Input } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-gainers-list',
  templateUrl: './gainers-list.component.html',
  styleUrls: ['./gainers-list.component.scss']
})
export class GainersListComponent implements OnInit {

  list: StockQuote[];

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.topGainersList.subscribe((topGainers: StockQuote[]) => {
      this.list = topGainers;
    })

    if (!this.list)
      this.stockService.updateGainers();
  }

  updateList(): void {
    this.stockService.updateGainers();
  }
}
