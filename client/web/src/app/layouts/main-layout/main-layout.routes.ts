import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { SelfGuard } from 'src/app/core/guards/self/self.guard';
import { MainLayoutComponent } from './main-layout.component';
import { MainNotFoundPageComponent } from 'src/app/shared/components/not-found/main-not-found-page/main-not-found-page.component';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [SelfGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      }
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [SelfGuard],
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: '**',
    component: MainNotFoundPageComponent
  }
]