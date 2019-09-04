import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { Title } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss'],
  providers: [CurrencyPipe]
})
export class StocksPageComponent implements OnInit {

  stockDetails: StockDetails;
  currencySymbol: string = '$';

  constructor(private route: ActivatedRoute, private titleService: Title,
    private cp: CurrencyPipe, private loadingService: LoadingService) {
    this.loadingService.stopLoading()
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.stockDetails = this.route.snapshot.data.stockDetails;
      this.setPageTitle(this.stockDetails.symbol, this.stockDetails.quote.latestPrice);
    })
  }

  setPageTitle(symbol: string, price: number): void {
    // A hack to get around the title service action in app.component (oh well)
    setTimeout(() => {
      this.titleService.setTitle(symbol + " - " + this.cp.transform(price) + ' | Batman')
    }, 0);
  }
}
