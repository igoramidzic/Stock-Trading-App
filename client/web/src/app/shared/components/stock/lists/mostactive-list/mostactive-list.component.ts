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

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.mostActiveList.subscribe((list: StockQuote[]) => {
      this.list = list;
    })

    if (!this.list)
      this.stockService.updateMostActive();
  }

  updateList(): void {
    this.stockService.updateMostActive();
  }
}
