import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-price-change-today',
  templateUrl: './price-change-today.component.html',
  styleUrls: ['./price-change-today.component.scss']
})
export class PriceChangeTodayComponent implements OnInit {

  @Input() priceChange: number;
  @Input() percentChange: number;

  constructor() { }

  ngOnInit() {
  }

}
