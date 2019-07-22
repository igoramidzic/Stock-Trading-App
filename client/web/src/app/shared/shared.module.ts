import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainAlertComponent } from './components/alerts/main-alert/main-alert.component';
import { ApplicationLoaderComponent } from './components/loaders/application-loader/application-loader.component';
import { MainLoaderComponent } from './components/loaders/main-loader/main-loader.component';
import { MainNavbarComponent } from './components/navs/main-navbar/main-navbar.component';

@NgModule({
  declarations: [
    MainAlertComponent,
    ApplicationLoaderComponent,
    MainLoaderComponent,
    MainNavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    ApplicationLoaderComponent,
    MainLoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MainAlertComponent,
    MainNavbarComponent
  ],
  providers: []
})
export class SharedModule { }
