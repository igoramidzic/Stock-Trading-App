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

  watchlist: { stockDetails: StockDetails, quote: StockQuote }[];
  isLoading: boolean;
  allowedToReload: boolean;
  isError: boolean;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
    this.updateWatchlist();
  }

  updateWatchlist(): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this.isError = false;
    this.allowedToReload = false;
    this.watchlistService.getWatchList()
      .then((watchlist: { stockDetails: StockDetails, quote: StockQuote }[]) => {
        this.watchlist = watchlist;
        this.watchlist.sort((a, b) => a.stockDetails.symbol > b.stockDetails.symbol ? 1 : -1)
      })
      .catch(() => {
        this.isError = true;
      })
      .finally(() => {
        this.isLoading = false
        setTimeout(() => {
          this.allowedToReload = true;
        }, 10000);
      })
  }

  get emptyWatchList(): StockQuote[] {
    let list: StockQuote[] = new Array(!this.watchlist ? 3 : this.watchlist.length);
    return list;
  }
}
