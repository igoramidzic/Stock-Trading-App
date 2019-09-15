import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portfolio } from 'src/app/core/models/portfolio/portfolio';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { Transaction } from 'src/app/core/models/transaction/transaction';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getPortfolio(): Promise<Portfolio[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/portfolio`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.portfolio)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  buyStock(stockId: string, quantity: number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/portfolio/buy`, { stockId, quantity })
        .subscribe((res: ClientResponse) => {
          resolve(res.result.transaction)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  sellStock(stockId: string, quantity: number): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/portfolio/sell`, { stockId, quantity })
        .subscribe((res: ClientResponse) => {
          resolve(res.result.transaction)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }
}
