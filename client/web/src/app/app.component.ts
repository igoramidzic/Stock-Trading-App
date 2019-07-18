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

  themeClass: string;

  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.watchTheme();

    this.themeService.theme$.subscribe((theme: Theme) => {
      this.themeClass = this.themeService.getThemeClass(theme);
    })
  }
}
