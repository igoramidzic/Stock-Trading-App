import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgPipesModule } from "ngx-pipes";
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ApplicationLoaderComponent } from "./components/loaders/application-loader/application-loader.component";
import { MainLoaderComponent } from "./components/loaders/main-loader/main-loader.component";
import { MainNavbarComponent } from "./components/navs/main-navbar/main-navbar.component";
import { NotificationsMenuComponent } from "./components/navs/main-navbar/notifications-menu/notifications-menu.component";
import { AccountMenuComponent } from "./components/navs/main-navbar/account-menu/account-menu.component";
import { MainNotFoundPageComponent } from "./components/not-found/main-not-found-page/main-not-found-page.component";
import { NavSearchComponent } from "./components/navs/main-navbar/nav-search/nav-search.component";
import { HighlightSearchPipe } from "../core/pipes/highlight-search/highlight-search.pipe";
import { CollectionsLinkListComponent } from "./components/collections-link-list/collections-link-list.component";
import { Ng2OdometerModule } from "ng2-odometer";
import { OdometerComponent } from "./components/odometer/odometer.component";
import { BuyStockCardComponent } from "./components/stock/buy-stock-card/buy-stock-card.component";
import { AccountNavbarComponent } from "./components/navs/account-navbar/account-navbar.component";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TransferFundsComponent } from './components/banking/transfer-funds/transfer-funds.component';
import { ProfileUpdateFormComponent } from './components/settings/profile-update-form/profile-update-form.component';
import { PasswordUpdateFormComponent } from './components/settings/password-update-form/password-update-form.component';
import { MainSuccessAlertComponent } from './components/alerts/main-success-alert/main-success-alert.component';
import { MainErrorAlertComponent } from './components/alerts/main-error-alert/main-error-alert.component';
import { PriceChangeTodayComponent } from './components/stock/price-change-today/price-change-today.component';
import { TransferFundsFormComponent } from './components/banking/transfer-funds-form/transfer-funds-form.component';
import { LinkedAccountsListComponent } from './components/banking/linked-accounts-list/linked-accounts-list.component';
import { LinkAccountFormComponent } from './components/banking/link-account-form/link-account-form.component';
import { LinkedAccountItemComponent } from './components/banking/linked-accounts-list/linked-account-item/linked-account-item.component';

import { MatDialogModule } from '@angular/material/dialog';
import { DeleteAccountFormComponent } from './components/settings/delete-account-form/delete-account-form.component';
import { DeleteAccountDialogComponent } from './components/settings/delete-account-dialog/delete-account-dialog.component';
import { PortfolioValueComponent } from './components/account/portfolio-value/portfolio-value.component';
import { SearchStockModalComponent } from './components/stock/search-stock-modal/search-stock-modal.component';
import { WatchListComponent } from './components/watchlist/watch-list/watch-list.component';
import { WatchlistBtnComponent } from './components/watchlist/watchlist-btn/watchlist-btn.component';
import { HistoryListComponent } from './components/history/history-list/history-list.component';
import { TransactionHistoryItemComponent } from './components/history/transaction-history-item/transaction-history-item.component';
import { TransferHistoryItemComponent } from './components/history/transfer-history-item/transfer-history-item.component';
import { OwnedStockComponent } from './components/account/owned-stock/owned-stock.component';
import { StockDetailsComponent } from './components/stock/stock-details/stock-details.component';
import { StockLineChartComponent } from './components/charts/stock-line-chart/stock-line-chart.component';
import { SearchStockComponent } from './components/stock/search-stock/search-stock.component';
import { RemoveLinkedAccountDialogComponent } from './components/banking/remove-linked-account-dialog/remove-linked-account-dialog.component';
import { PopularStocksComponent } from './components/stock/popular-stocks/popular-stocks.component';
import { StockNewsComponent } from './components/stock/stock-news/stock-news.component';

@NgModule({
  declarations: [
    MainErrorAlertComponent,
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
    TransferFundsComponent,
    ProfileUpdateFormComponent,
    PasswordUpdateFormComponent,
    MainSuccessAlertComponent,
    PriceChangeTodayComponent,
    TransferFundsFormComponent,
    LinkedAccountsListComponent,
    LinkAccountFormComponent,
    LinkedAccountItemComponent,
    DeleteAccountFormComponent,
    DeleteAccountDialogComponent,
    PortfolioValueComponent,
    SearchStockModalComponent,
    WatchListComponent,
    WatchlistBtnComponent,
    HistoryListComponent,
    TransactionHistoryItemComponent,
    TransferHistoryItemComponent,
    OwnedStockComponent,
    StockDetailsComponent,
    StockLineChartComponent,
    SearchStockComponent,
    RemoveLinkedAccountDialogComponent,
    PopularStocksComponent,
    StockNewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgPipesModule,
    Ng2OdometerModule,
    CurrencyMaskModule,
    MatDialogModule,
    ChartsModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    ApplicationLoaderComponent,
    MainLoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MainErrorAlertComponent,
    MainNavbarComponent,
    HighlightSearchPipe,
    MainNotFoundPageComponent,
    NgPipesModule,
    CollectionsLinkListComponent,
    Ng2OdometerModule,
    OdometerComponent,
    BuyStockCardComponent,
    AccountNavbarComponent,
    TransferFundsComponent,
    CurrencyMaskModule,
    ProfileUpdateFormComponent,
    PasswordUpdateFormComponent,
    MainSuccessAlertComponent,
    PriceChangeTodayComponent,
    TransferFundsFormComponent,
    LinkedAccountsListComponent,
    LinkAccountFormComponent,
    LinkedAccountItemComponent,
    DeleteAccountFormComponent,
    DeleteAccountDialogComponent,
    MatDialogModule,
    PortfolioValueComponent,
    SearchStockModalComponent,
    WatchListComponent,
    WatchlistBtnComponent,
    HistoryListComponent,
    TransactionHistoryItemComponent,
    TransferHistoryItemComponent,
    OwnedStockComponent,
    StockDetailsComponent,
    StockLineChartComponent,
    NavSearchComponent,
    SearchStockComponent,
    PopularStocksComponent,
    StockNewsComponent
  ],
  providers: [],
  entryComponents: [DeleteAccountDialogComponent, SearchStockModalComponent, RemoveLinkedAccountDialogComponent]
})
export class SharedModule { }
