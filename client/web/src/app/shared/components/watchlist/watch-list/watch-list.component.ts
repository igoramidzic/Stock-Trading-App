import { Component, OnInit, Input } from '@angular/core';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {

  @Input() watchlist: { stockDetails: StockDetails, quote: StockQuote }[];

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.watchlist.sort((a, b) => a.stockDetails.symbol > b.stockDetails.symbol ? 1 : -1)
  }

  updateWatchlist(): void {
    this.watchlistService.getWatchList()
      .then((watchlist: { stockDetails: StockDetails, quote: StockQuote }[]) => {
        this.watchlist = watchlist;
        this.watchlist.sort((a, b) => a.stockDetails.symbol > b.stockDetails.symbol ? 1 : -1)
      })
      .catch(() => { })
  }
}
