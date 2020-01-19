import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockCompany } from 'src/app/core/models/stock/company';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockNews } from 'src/app/core/models/stock/news';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  mostActiveList: BehaviorSubject<StockQuote[]> = new BehaviorSubject(null);
  topGainersList: BehaviorSubject<StockQuote[]> = new BehaviorSubject(null);
  topLosersList: BehaviorSubject<StockQuote[]> = new BehaviorSubject(null);

  allowReloadMostActive: boolean;
  allowReloadTopGainers: boolean;
  allowReloadTopLosers: boolean;

  constructor(private http: HttpClient) { }

  search(partial: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/search/${partial}`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.stocks);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  stockDetails(symbol: string): Promise<StockDetails> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/details`)
        .subscribe((res: ClientResponse) => {
          const details: StockDetails = res.result.details;
          resolve(details);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  quote(symbol: string): Promise<StockQuote> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/quote`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.quote);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  company(symbol: string): Promise<StockCompany> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/company`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.company);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  news(symbol: string, last: number): Promise<StockNews[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/news?last=${last}`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.news);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  updateGainers(): Promise<StockQuote[]> {
    this.allowReloadTopGainers = false;
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/list/gainers`)
        .subscribe((res: ClientResponse) => {
          this.topGainersList.next(res.result.list);
          resolve(res.result.list);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        }, () => setTimeout(() => {
          this.allowReloadTopGainers = true;
        }, 10000))
    })
  }

  updateLosers(): Promise<StockQuote[]> {
    this.allowReloadTopLosers = false;
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/list/losers`)
        .subscribe((res: ClientResponse) => {
          this.topLosersList.next(res.result.list);
          resolve(res.result.list);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        }, () => setTimeout(() => {
          this.allowReloadTopLosers = true;
        }, 10000))
    })
  }

  updateMostActive(): Promise<StockQuote[]> {
    this.allowReloadMostActive = false;
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/list/mostactive`)
        .subscribe((res: ClientResponse) => {
          this.mostActiveList.next(res.result.list);
          resolve(res.result.list);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        }, () => setTimeout(() => {
          this.allowReloadMostActive = true;
        }, 10000))
    })
  }
}
