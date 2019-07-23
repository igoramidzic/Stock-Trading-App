import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { NotAuthGuard } from '../core/guards/not-auth/not-auth.guard';
import { LoginFormComponent } from './auth-layout/forms/login-form/login-form.component';
import { SignupFormComponent } from './auth-layout/forms/signup-form/signup-form.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SelfGuard } from '../core/guards/self/self.guard';

export const LAYOUTS_ROUTES: Routes = [
    {
        path: 'login',
        component: AuthLayoutComponent,
        canActivate: [NotAuthGuard],
        children: [{
            path: '',
            pathMatch: 'full',
            component: LoginFormComponent,
            data: {
                title: 'Log In'
            }
        }]
    },
    {
        path: 'signup',
        component: AuthLayoutComponent,
        canActivate: [NotAuthGuard],
        children: [{
            path: '',
            pathMatch: 'full',
            component: SignupFormComponent,
            data: {
                title: 'Sign Up'
            }
        }]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: MainLayoutComponent,
        loadChildren: './main-layout/main-layout.module#MainLayoutModule'
    }
]
