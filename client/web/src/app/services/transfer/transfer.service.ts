import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transfer } from 'src/app/core/models/transfer/transfer';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  createTransfer(transferDetails: Transfer): Promise<Transfer> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/transfer`, transferDetails)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.transfer)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }
}
