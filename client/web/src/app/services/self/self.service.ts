import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getSelf(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/self`)
        .subscribe((res: ClientResponse) => {
          this.updateSelf(res.result.user)
          resolve(res.result.user)
        },
          (err: ClientResponse) => reject(err))
    })
  }

  updateSelf(user: User): void {
    this.user$.next(user);
  }

  removeUser(): void {
    this.user$.next(null);
  }
}
