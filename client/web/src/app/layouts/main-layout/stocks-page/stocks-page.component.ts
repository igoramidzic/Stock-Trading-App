import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss']
})
export class StocksPageComponent implements OnInit {

  stockDetails: StockDetails;
  currencySymbol: string = '$';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.stockDetails = this.route.snapshot.data.stockDetails;
    })
  }

}
