import { NgModule } from '@angular/core';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LAYOUTS_ROUTES } from './layouts.routes';
import { LoginFormComponent } from './auth-layout/forms/login-form/login-form.component';
import { SignupFormComponent } from './auth-layout/forms/signup-form/signup-form.component';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        MainLayoutComponent,
        LoginFormComponent,
        SignupFormComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(LAYOUTS_ROUTES)
    ],
    exports: [
    ],
    providers: []
})
export class LayoutsModule { }
