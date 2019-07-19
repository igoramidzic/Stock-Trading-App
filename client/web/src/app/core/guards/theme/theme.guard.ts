import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Theme } from '../../models/theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeGuard implements CanActivate {

  constructor(private themeService: ThemeService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.themeService.updateMainTheme(Theme.Light)
    this.themeService.updateSecondaryTheme(Theme.Up)
    return true;

  }
}
