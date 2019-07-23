import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAINLAYOUT_ROUTES } from './main-layout.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { GoldPageComponent } from './gold-page/gold-page.component';

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
  providers: []
})
export class MainLayoutModule { }
