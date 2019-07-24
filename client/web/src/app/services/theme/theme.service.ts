import { Injectable, Inject } from '@angular/core';
import { Theme } from 'src/app/core/models/theme/theme';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { SocketioService } from '../socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient,
    private socketioService: SocketioService) {
    this.socketioService.listen('theme-update')
      .subscribe((theme: Theme) => {
        if (theme == 1 || theme == 2)
          this.setMainTheme(theme)
        else
          this.setSecondaryTheme(theme);
      })

    this.socketioService.emit('connection', 'hello')
  }

  setActiveMainTheme(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiBase}/themes/active`)
        .subscribe((res: ClientResponse) => {
          this.setMainTheme(res.result.theme)
        }, (err: ClientResponse) => {
          console.log(err);
        })
    })
  }

  setMainTheme(theme: Theme): void {
    this.document.body.classList.remove('theme-open')
    this.document.body.classList.remove('theme-closed')
    switch (theme) {
      case Theme.Open:
        this.document.body.classList.add('theme-open');
        break;
      case Theme.Closed:
        this.document.body.classList.add('theme-closed');
        break;
    }
  }

  setSecondaryTheme(theme: Theme): void {
    this.document.body.classList.remove('theme-up')
    this.document.body.classList.remove('theme-down')

    switch (theme) {
      case Theme.Up:
        this.document.body.classList.add('theme-up');
        break;
      case Theme.Down:
        this.document.body.classList.add('theme-down');
        break;
    }
  }

  setDefaultTheme(): void {
    this.document.body.classList.remove('theme-open')
    this.document.body.classList.remove('theme-closed')
    this.document.body.classList.remove('theme-up')
    this.document.body.classList.remove('theme-down')
    this.document.body.classList.add('theme-open')
    this.document.body.classList.add('theme-up')
  }
}
