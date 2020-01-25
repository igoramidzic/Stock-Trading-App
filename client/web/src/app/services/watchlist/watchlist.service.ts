import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http: HttpClient) { }

  getWatchList(): Promise<{ stockDetails: StockDetails, quote: StockQuote }[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/watchlist`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.watchlist)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  getIfAlreadyWatching(stockId: string): Promise<{ isWatching: boolean }> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/watchlist/${stockId}`)
        .subscribe((res: ClientResponse) => {
          resolve({ isWatching: res.result.isWatching })
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  addToWatchlist(stockId: string): Promise<StockDetails[]> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/watchlist`, { stockId })
        .subscribe((res: ClientResponse) => {
          resolve(res.result.watchlist)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  removeFromWatchlist(stockId: string): Promise<StockDetails[]> {
    return new Promise((resolve, reject) => {
      this.http.request('delete', `${environment.apiBase}/watchlist`, { body: { stockId } })
        .subscribe((res: ClientResponse) => {
          resolve(res.result.watchlist)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }
}
