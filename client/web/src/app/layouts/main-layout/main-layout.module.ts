import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINLAYOUT_ROUTES } from './main-layout.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { StockDetailsResolver } from 'src/app/core/resolvers/stock-details/stock-details.resolver';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { AccountResolver } from 'src/app/core/resolvers/account/account.resolver';
import { AlreadyWatchingResolver } from 'src/app/core/resolvers/watchlist/watchlist.resolver';
import { OwnedStockResolver } from 'src/app/core/resolvers/portfolio/ownedstock.resolver';

@NgModule({
  declarations: [
    HomePageComponent,
    AccountLayoutComponent,
    StocksPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MAINLAYOUT_ROUTES)
  ],
  exports: [
  ],
  providers: [StockDetailsResolver, ThemeService, AccountResolver, AlreadyWatchingResolver,
    OwnedStockResolver]
})
export class MainLayoutModule { }
