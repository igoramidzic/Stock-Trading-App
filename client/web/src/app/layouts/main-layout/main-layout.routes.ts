import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const MAINLAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      title: 'Home'
    }
  }
]
