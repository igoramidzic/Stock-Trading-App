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
  loading: boolean;
  isError: boolean;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.topGainersList.subscribe((topGainers: StockQuote[]) => {
      this.list = topGainers;
    })
  }

  updateList(): void {
    this.loading = true;
    this.isError = false;
    this.stockService.updateGainers()
      .catch(() => this.isError = true)
      .finally(() => this.loading = false);
  }

  get emptyStockList(): StockQuote[] {
    let list: StockQuote[] = new Array(!this.list ? 10 : this.list.length);
    return list;
  }

  onScroll(): void {
    if (!this.list)
      this.updateList();
  }
}
