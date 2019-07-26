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
    HighlightSearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgPipesModule
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
    HighlightSearchPipe
  ],
  providers: []
})
export class SharedModule { }
