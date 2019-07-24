import { Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { SelfGuard } from 'src/app/core/guards/self/self.guard';
import { MainNotFoundPageComponent } from 'src/app/shared/components/not-found/main-not-found-page/main-not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { GoldPageComponent } from './gold-page/gold-page.component';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [SelfGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
        data: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    canActivate: [SelfGuard],
    loadChildren: './account-layout/account-layout.module#AccountLayoutModule'
  },
  {
    path: 'stocks/:stock-symbol',
    component: StocksPageComponent
  },
  {
    path: 'gold',
    component: GoldPageComponent
  },
  {
    path: '**',
    component: MainNotFoundPageComponent
  }
]