import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from 'src/app/core/models/theme/theme';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  updateMainTheme(theme: Theme): void {
    this.document.body.classList.remove(Theme.Light)
    this.document.body.classList.remove(Theme.Dark)
    this.document.body.classList.add(theme);
  }

  updateSecondaryTheme(theme: Theme): void {
    this.document.body.classList.remove(Theme.Up)
    this.document.body.classList.remove(Theme.Down)
    this.document.body.classList.add(theme);
  }
}
