import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { BehaviorSubject } from 'rxjs';
import { Theme } from 'src/app/core/models/theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme: BehaviorSubject<Theme> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getTheme(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiBase + '/themes/active')
        .subscribe((res: ClientResponse) => {
          this.theme.next(res.result.theme);
          resolve(res.result.theme);
        }, (error: ClientResponse) => {
          reject(error);
        })
    })
  }
}
