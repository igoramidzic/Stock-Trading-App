import { Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { SelfGuard } from 'src/app/core/guards/self/self.guard';
import { MainNotFoundPageComponent } from 'src/app/shared/components/not-found/main-not-found-page/main-not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { GoldPageComponent } from './gold-page/gold-page.component';
import { StockDetailsResolver } from 'src/app/core/resolvers/stock-details/stock-details.resolver';
import { UserDetailsResolver } from 'src/app/core/resolvers/user-details/user-details.resolver';

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
    loadChildren: './account-layout/account-layout.module#AccountLayoutModule',
    resolve: { user: UserDetailsResolver }
  },
  {
    path: 'stocks/:symbol',
    component: StocksPageComponent,
    canActivate: [SelfGuard],
    resolve: { stockDetails: StockDetailsResolver }
  },
  {
    path: 'gold',
    component: GoldPageComponent,
    data: {
      title: 'Gold'
    }
  },
  {
    path: '**',
    component: MainNotFoundPageComponent
  }
]