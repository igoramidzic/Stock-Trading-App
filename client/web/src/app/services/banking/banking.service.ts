import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http: HttpClient) { }

  getBankAccounts(): Promise<BankAccount[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/bankAccounts`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.bankAccounts)
        },
          (err: ClientResponse) => reject(err))
    })
  }

  createBankAccount(bankAccountDetails: BankAccount): Promise<BankAccount> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/bankAccounts`, bankAccountDetails)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.bankAccount)
        },
          (err: ClientResponse) => reject(err))
    })
  }

  deleteBankAccount(id: string): Promise<BankAccount> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.apiBase}/bankAccounts/${id}`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.bankAccount)
        },
          (err: ClientResponse) => reject(err))
    })
  }
}
