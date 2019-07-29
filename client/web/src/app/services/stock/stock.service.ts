import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { StockQuote } from 'src/app/core/models/stock/quote';
import { StockCompany } from 'src/app/core/models/stock/company';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';

@Injectable({
  providedIn: 'root'
})
export class StockService {

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

  stockDetails(symbol: string): Promise<{ quote: StockQuote, company: StockCompany }> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/details`)
        .subscribe((res: ClientResponse) => {
          const details: { details: StockDetails, quote: StockQuote, company: StockCompany } = res.result.details;
          resolve(details);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  quote(symbol: string): Promise<{ quote: StockQuote, company: StockCompany }> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/quote`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.quote);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  company(symbol: string): Promise<{ quote: StockQuote, company: StockCompany }> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/${symbol}/company`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.company);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }
}