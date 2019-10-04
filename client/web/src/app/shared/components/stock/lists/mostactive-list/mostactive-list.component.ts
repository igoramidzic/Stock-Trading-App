import { Component, OnInit, Input } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-mostactive-list',
  templateUrl: './mostactive-list.component.html',
  styleUrls: ['./mostactive-list.component.scss']
})
export class MostactiveListComponent implements OnInit {
  list: StockQuote[];
  initiallyLoaded: boolean;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.mostActiveList.subscribe((topGainers: StockQuote[]) => {
      this.list = topGainers;
    })

    if (this.list)
      this.initiallyLoaded = true;
  }

  updateList(): void {
    this.initiallyLoaded = true;
    this.stockService.updateMostActive();
  }
}
