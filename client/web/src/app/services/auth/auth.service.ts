import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { LoginCredentials, SignupCredentials } from 'src/app/core/models/auth/auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenName: string = 'access_token';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService,
    private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.accessTokenName);
    return !this.jwtHelperService.isTokenExpired(token);
  }

  authenticate(credentials: LoginCredentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiBase}/auth/login`, credentials)
        .subscribe((res: ClientResponse) => {
          this.storeJwtTokenInLocalStorage(res.result.token);
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
          this.storeJwtTokenInLocalStorage(res.result.token);
          resolve(res);
        }, (err: { error: ClientResponse }) => {
          reject(err.error);
        })
    })
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem(this.accessTokenName);
      this.router.navigate(['login']);
      resolve();
    })
  }

  storeJwtTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.accessTokenName, token);
  }
}
