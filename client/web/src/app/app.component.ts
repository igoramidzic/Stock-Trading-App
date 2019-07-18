import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { Theme } from './core/models/theme/theme';
import { ClientResponse } from './core/models/response/clientResponse';
import { SocketioService } from './services/socketio/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themes: string[] = [
    'theme-open-up',
    'theme-open-down',
    'theme-closed-up',
    'theme-closed-down'
  ];

  constructor(private themeService: ThemeService, private socketioService: SocketioService) {

  }

  ngOnInit(): void {
    this.themeService.getTheme()
      .then((theme: Theme) => {
        console.log(theme);
      })
      .catch((error: ClientResponse) => {
        console.log(error);
      })

    this.socketioService.emit('connection', { something: 'or other' })
  }

  onListen(): void {
    this.socketioService.listen('hello')
      .subscribe(data => {
        console.log(data)
      })

    this.socketioService.emit('connection', null);
  }
}
