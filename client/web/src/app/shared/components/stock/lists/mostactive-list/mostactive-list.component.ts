import { Component, OnInit } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-mostactive-list',
  templateUrl: './mostactive-list.component.html',
  styleUrls: ['./mostactive-list.component.scss']
})
export class MostactiveListComponent implements OnInit {
  list: StockQuote[];
  loading: boolean;
  isError: boolean;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.mostActiveList.subscribe((topGainers: StockQuote[]) => {
      this.list = topGainers;
    })

    if (!this.list)
      this.updateList();
  }

  updateList(): void {
    this.loading = true;
    this.isError = false;
    this.stockService.updateMostActive()
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
