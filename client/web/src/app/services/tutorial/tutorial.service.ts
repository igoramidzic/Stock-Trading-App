import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TutorialItem } from 'src/app/core/models/tutorial/tutorialItem';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getTutorialItems(): Promise<TutorialItem[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/tutorial`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.tutorialItems)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  hideTutorial(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/tutorial/hide`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.hideTutorial)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }

  showTutorial(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/tutorial/show`)
        .subscribe((res: ClientResponse) => {
          resolve(res.result.hideTutorial)
        },
          (err: { error: ClientResponse }) => reject(err.error))
    })
  }
}
