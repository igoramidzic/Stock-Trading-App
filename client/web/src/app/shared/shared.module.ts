import { NgModule } from '@angular/core';
import { ThemeTogglerComponent } from './components/theme-toggler/theme-toggler.component';
import { RouterModule } from '@angular/router';
import { SHARED_ROUTES } from './shared.routes';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup-form/signup-form.component';

@NgModule({
  declarations: [
    ThemeTogglerComponent,
    AuthLayoutComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    RouterModule.forChild(SHARED_ROUTES)
  ],
  exports: [
    ThemeTogglerComponent,
    AuthLayoutComponent,
  ],
  providers: []
})
export class SharedModule { }
