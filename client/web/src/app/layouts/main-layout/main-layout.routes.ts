import { Routes } from '@angular/router';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { SelfGuard } from 'src/app/core/guards/self/self.guard';
import { MainNotFoundPageComponent } from 'src/app/shared/components/not-found/main-not-found-page/main-not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { StockDetailsResolver } from 'src/app/core/resolvers/stock-details/stock-details.resolver';
import { AccountResolver } from 'src/app/core/resolvers/account/account.resolver';
import { WatchlistResolver, AlreadyWatchingResolver } from 'src/app/core/resolvers/watchlist/watchlist.resolver';
import { OwnedStockResolver } from 'src/app/core/resolvers/portfolio/ownedstock.resolver';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [SelfGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
        resolve: { watchlist: WatchlistResolver },
        data: {
          title: 'Portfolio'
        }
      }
    ]
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    canActivate: [SelfGuard],
    loadChildren: './account-layout/account-layout.module#AccountLayoutModule',
  },
  {
    path: 'stocks/:symbol',
    canActivate: [SelfGuard],
    resolve: { stockDetails: StockDetailsResolver, account: AccountResolver, ownedStock: OwnedStockResolver },
    children: [{
      path: '',
      component: StocksPageComponent,
      resolve: {
        isWatching: AlreadyWatchingResolver
      }
    }]
  },
  {
    path: '**',
    component: MainNotFoundPageComponent
  }
]