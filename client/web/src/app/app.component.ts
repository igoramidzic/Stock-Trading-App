import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  themes: string[] = [
    'theme-open-up',
    'theme-open-down',
    'theme-closed-up',
    'theme-closed-down'
  ];
  // theme: string = 'theme-open-up';

  // openUpTheme(): void {
  //   this.theme = 'theme-open-up';
  // }

  // openDownTheme(): void {
  //   this.theme = 'theme-open-down';
  // }

  // closedUpTheme(): void {
  //   this.theme = 'theme-closed-up';
  // }

  // closedDownTheme(): void {
  //   this.theme = 'theme-closed-down';
  // }
}
