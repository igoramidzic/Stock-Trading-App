import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgPipesModule } from 'ngx-pipes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainAlertComponent } from './components/alerts/main-alert/main-alert.component';
import { ApplicationLoaderComponent } from './components/loaders/application-loader/application-loader.component';
import { MainLoaderComponent } from './components/loaders/main-loader/main-loader.component';
import { MainNavbarComponent } from './components/navs/main-navbar/main-navbar.component';
import { NotificationsMenuComponent } from './components/navs/main-navbar/notifications-menu/notifications-menu.component';
import { AccountMenuComponent } from './components/navs/main-navbar/account-menu/account-menu.component';
import { MainNotFoundPageComponent } from './components/not-found/main-not-found-page/main-not-found-page.component';
import { NavSearchComponent } from './components/navs/main-navbar/nav-search/nav-search.component';
import { HighlightSearchPipe } from '../core/pipes/highlight-search/highlight-search.pipe';
import { CollectionsLinkListComponent } from './components/collections-link-list/collections-link-list.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { OdometerComponent } from './components/odometer/odometer.component';
import { BuyStockCardComponent } from './components/stock/buy-stock-card/buy-stock-card.component';
import { AccountNavbarComponent } from './components/navs/account-navbar/account-navbar.component';
import { FreeStockIconComponent } from './components/navs/main-navbar/account-menu/icons/free-stock-icon/free-stock-icon.component';
import { RobinhoodGoldIconComponent } from './components/navs/main-navbar/account-menu/icons/robinhood-gold-icon/robinhood-gold-icon.component';
import { AccountIconComponent } from './components/navs/main-navbar/account-menu/icons/account-icon/account-icon.component';
import { BankingIconComponent } from './components/navs/main-navbar/account-menu/icons/banking-icon/banking-icon.component';
import { HistoryIconComponent } from './components/navs/main-navbar/account-menu/icons/history-icon/history-icon.component';
import { SettingsIconComponent } from './components/navs/main-navbar/account-menu/icons/settings-icon/settings-icon.component';
import { HelpIconComponent } from './components/navs/main-navbar/account-menu/icons/help-icon/help-icon.component';
import { DisclosuresIconComponent } from './components/navs/main-navbar/account-menu/icons/disclosures-icon/disclosures-icon.component';
import { LogoutIconComponent } from './components/navs/main-navbar/account-menu/icons/logout-icon/logout-icon.component';

@NgModule({
  declarations: [
    MainAlertComponent,
    ApplicationLoaderComponent,
    MainLoaderComponent,
    MainNavbarComponent,
    NotificationsMenuComponent,
    AccountMenuComponent,
    MainNotFoundPageComponent,
    NavSearchComponent,
    HighlightSearchPipe,
    CollectionsLinkListComponent,
    OdometerComponent,
    BuyStockCardComponent,
    AccountNavbarComponent,
    FreeStockIconComponent,
    RobinhoodGoldIconComponent,
    AccountIconComponent,
    BankingIconComponent,
    HistoryIconComponent,
    SettingsIconComponent,
    HelpIconComponent,
    DisclosuresIconComponent,
    LogoutIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgPipesModule,
    Ng2OdometerModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    ApplicationLoaderComponent,
    MainLoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MainAlertComponent,
    MainNavbarComponent,
    HighlightSearchPipe,
    MainNotFoundPageComponent,
    NgPipesModule,
    CollectionsLinkListComponent,
    Ng2OdometerModule,
    OdometerComponent,
    BuyStockCardComponent,
    AccountNavbarComponent,
    FreeStockIconComponent,
    RobinhoodGoldIconComponent
  ],
  providers: []
})
export class SharedModule { }
