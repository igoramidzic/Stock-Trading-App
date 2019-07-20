import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated: boolean = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._isAuthenticated = true;
      resolve();
    })
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._isAuthenticated = false;
      resolve();
    })
  }
}
