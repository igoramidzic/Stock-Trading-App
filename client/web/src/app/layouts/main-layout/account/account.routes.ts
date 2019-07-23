import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        data: {
            title: 'Account'
        }
    },
]
