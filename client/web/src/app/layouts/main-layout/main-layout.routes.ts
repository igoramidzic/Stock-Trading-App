import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { HomeComponent } from './home/home.component';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  }
]
