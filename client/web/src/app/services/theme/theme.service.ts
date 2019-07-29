import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Theme } from 'src/app/core/models/theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeStorageName: string = "darkThemeEnabled";

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setActiveTheme();
  }

  setActiveTheme(): void {
    this.usingDarkTheme() ? this.setDarkTheme() : this.setLightTheme();
  }

  usingDarkTheme(): boolean {
    return localStorage.getItem(this.darkThemeStorageName) === Theme.Dark.toString();
  }

  setDefaultTheme(): void {
    this.setLightTheme();
  }

  toggleTheme(): void {
    if (this.usingDarkTheme()) {
      this.setLightTheme();
      this.storeThemeChoice(Theme.Light);
    } else {
      this.setDarkTheme();
      this.storeThemeChoice(Theme.Dark);
    }
  }

  private setDarkTheme(): void {
    this.document.body.classList.remove('theme-open');
    this.document.body.classList.add('theme-closed');
  }

  private setLightTheme(): void {
    this.document.body.classList.remove('theme-closed');
    this.document.body.classList.add('theme-open');
  }

  private storeThemeChoice(theme: Theme): void {
    localStorage.setItem(this.darkThemeStorageName, theme.toString());
  }
}
