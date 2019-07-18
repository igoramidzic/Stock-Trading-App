import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { BehaviorSubject } from 'rxjs';
import { Theme } from 'src/app/core/models/theme/theme';
import { SocketioService } from '../socketio/socketio.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme$: BehaviorSubject<Theme> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private socketioService: SocketioService) { }

  watchTheme(): void {
    this.socketioService.listen('theme-update').subscribe((theme: Theme) => {
      this.theme$.next(theme);
    })
  }

  getThemeClass(theme: Theme): string {
    switch (theme) {
      case 1:
        return 'theme-open-up'
      case 2:
        return 'theme-open-down'
      case 3:
        return 'theme-closed-up'
      case 4:
        return 'theme-closed-down'
      default:
        return null
    }
  }
}
