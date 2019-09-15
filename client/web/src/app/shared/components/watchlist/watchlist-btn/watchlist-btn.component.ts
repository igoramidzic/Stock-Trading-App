import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-watchlist-btn',
  templateUrl: './watchlist-btn.component.html',
  styleUrls: ['./watchlist-btn.component.scss']
})
export class WatchlistBtnComponent implements OnInit, OnChanges {

  @Input() stock: StockDetails;
  @Input() watching: boolean;
  @Output() updateWatchlistEmitter: EventEmitter<StockDetails[]> = new EventEmitter();

  submitting: boolean;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes.stock)
      this.stock = changes.stock.currentValue;

    if (changes.watching)
      this.watching = changes.watching.currentValue;
  }

  toggleWatch(): void {
    if (this.watching)
      this.removeFromWatchList();
    else
      this.addToWatchlist();
  }

  addToWatchlist(): void {
    this.submitting = true;
    this.watchlistService.addToWatchlist(this.stock._id)
      .then((watchlist: StockDetails[]) => {
        this.updateWatchlistEmitter.emit(watchlist);
        this.watching = true;
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.submitting = false
      })
  }

  removeFromWatchList(): void {
    this.submitting = true;
    this.watchlistService.removeFromWatchlist(this.stock._id)
      .then((watchlist: StockDetails[]) => {
        this.updateWatchlistEmitter.emit(watchlist);
        this.watching = false;
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        this.submitting = false
      })
  }
}
