import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return true;
  }

  authenticate(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
}
