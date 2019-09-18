import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { Title } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Account } from 'src/app/core/models/account/account';
import { BehaviorSubject } from 'rxjs';
import { OwnedStock } from 'src/app/core/models/portfolio/portfolio';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-stocks-page',
  templateUrl: './stocks-page.component.html',
  styleUrls: ['./stocks-page.component.scss'],
  providers: [CurrencyPipe]
})
export class StocksPageComponent implements OnInit, OnDestroy {

  stockDetails: StockDetails;
  account: Account;
  ownedStock: OwnedStock;
  isWatching: boolean;
  currencySymbol: string = '$';

  refreshStockQuote;

  constructor(private route: ActivatedRoute, private titleService: Title,
    private cp: CurrencyPipe, private stockService: StockService) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.stockDetails = this.route.snapshot.data.stockDetails;
      this.account = this.route.snapshot.data.account;
      this.ownedStock = this.route.snapshot.data.ownedStock;
      this.isWatching = this.route.snapshot.data.isWatching;

      this.setPageTitle(this.stockDetails.symbol, this.stockDetails.quote.latestPrice);
    })

    setInterval(() => {
      this.updateStockDetails();
    }, 15000)
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshStockQuote);
  }

  setPageTitle(symbol: string, price: number): void {
    // A hack to get around the title service action in app.component (oh well)
    setTimeout(() => {
      this.titleService.setTitle(symbol + " - " + this.cp.transform(price) + ' | Batman')
    }, 0);
  }

  updateStockDetails(): void {
    this.stockService.stockDetails(this.stockDetails.symbol)
      .then((stockDetails: StockDetails) => {
        this.stockDetails = stockDetails;
      })
      .catch((err) => console.log(err))
  }
}
