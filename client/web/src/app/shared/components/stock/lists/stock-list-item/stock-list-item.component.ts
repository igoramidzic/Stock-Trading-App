import { Component, OnInit, Input } from '@angular/core';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-stock-list-item',
  templateUrl: './stock-list-item.component.html',
  styleUrls: ['./stock-list-item.component.scss']
})
export class StockListItemComponent implements OnInit {

  @Input() quote: StockQuote;

  constructor() { }

  ngOnInit() {
  }

}
