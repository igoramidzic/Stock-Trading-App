import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccount(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/account`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.account)
        },
          (err: ClientResponse) => reject(err))
    })
  }
}
