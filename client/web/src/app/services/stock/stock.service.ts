import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

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

  quote(symbol: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/stock/quote/${symbol}`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.quote);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }
}
