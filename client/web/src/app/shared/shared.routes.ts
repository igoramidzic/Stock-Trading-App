// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
// import { AuthGuard } from '../core/guards/auth/auth.guard';
// import { NotAuthGuard } from '../core/guards/not-auth/not-auth.guard';
// import { LoginFormComponent } from '../components/auth/login-form/login-form.component';
// import { SignupFormComponent } from '../components/auth/signup-form/signup-form.component';

// export const SHARED_ROUTES: Routes = [
//   {
//     path: 'login',
//     canActivate: [NotAuthGuard],
//     component: AuthLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: LoginFormComponent,
//         pathMatch: 'full'
//       }
//     ],
//     data: {
//       title: 'Log In'
//     }
//   },
//   {
//     path: 'signup',
//     canActivate: [NotAuthGuard],
//     component: AuthLayoutComponent,
//     children: [
//       {
//         path: '',
//         component: SignupFormComponent,
//         pathMatch: 'full'
//       }
//     ],
//     data: {
//       title: 'Sign Up'
//     }
//   },
//   {
//     path: '',
//     canActivate: [AuthGuard],
//     loadChildren: '../layouts/main-layout/main-layout.module#MainLayoutModule'
//   }
// ]
