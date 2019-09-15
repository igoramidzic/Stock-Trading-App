import { Component, OnInit, Input } from '@angular/core';
import { OwnedStock } from 'src/app/core/models/portfolio/portfolio';

@Component({
  selector: 'app-owned-stock',
  templateUrl: './owned-stock.component.html',
  styleUrls: ['./owned-stock.component.scss']
})
export class OwnedStockComponent implements OnInit {

  @Input() ownedStock: OwnedStock;
  @Input() i: number;

  constructor() { }

  ngOnInit() {
  }

}
