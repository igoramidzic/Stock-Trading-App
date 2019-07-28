import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINLAYOUT_ROUTES } from './main-layout.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { GoldPageComponent } from './gold-page/gold-page.component';
import { StockDetailsResolver } from 'src/app/core/resolvers/stock-details/stock-details.resolver';
import { UserDetailsResolver } from 'src/app/core/resolvers/user-details/user-details.resolver';

@NgModule({
  declarations: [
    HomePageComponent,
    AccountLayoutComponent,
    StocksPageComponent,
    GoldPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MAINLAYOUT_ROUTES)
  ],
  exports: [
  ],
  providers: [StockDetailsResolver, UserDetailsResolver]
})
export class MainLayoutModule { }
