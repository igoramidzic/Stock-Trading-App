import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { LoginCredentials, SignupCredentials } from 'src/app/core/models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated: boolean = false;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  authenticate(credentials: LoginCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/auth/login`, credentials)
        .subscribe((res: ClientResponse) => {
          this._isAuthenticated = true;
          resolve(res);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  signUp(credentials: SignupCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/auth/create-user`, credentials)
        .subscribe((res: ClientResponse) => {
          this._isAuthenticated = true;
          resolve(res);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._isAuthenticated = false;
        resolve();
      }, 2000)
    })
  }
}
