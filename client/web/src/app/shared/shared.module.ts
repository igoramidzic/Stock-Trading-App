import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { RouterModule } from '@angular/router';
import { SHARED_ROUTES } from './shared.routes';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup-form/signup-form.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainLoaderComponent } from './components/loaders/main-loader/main-loader.component';
import { MainAlertComponent } from './components/alerts/main-alert/main-alert.component';

@NgModule({
  declarations: [
    ThemeTogglerComponent,
    AuthLayoutComponent,
    LoginFormComponent,
    SignupFormComponent,
    MainLoaderComponent,
    MainAlertComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SHARED_ROUTES)
  ],
  exports: [
    ThemeTogglerComponent,
    AuthLayoutComponent,
  ],
  providers: []
})
export class SharedModule { }
