import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from 'src/app/core/models/transaction/transaction';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/transactions`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.transactions)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }
}
