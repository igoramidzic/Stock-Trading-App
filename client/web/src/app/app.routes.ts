import { Routes } from '@angular/router';
import { ThemeGuard } from './core/guards/theme/theme.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [ThemeGuard],
    loadChildren: './shared/shared.module#SharedModule'
  }
]
