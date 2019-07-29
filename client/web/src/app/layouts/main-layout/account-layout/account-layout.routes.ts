import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AccountPageComponent,
        data: {
            title: 'Account'
        }
    },
    {
        path: 'banking',
        component: BankingPageComponent,
        data: {
            title: 'Account'
        }
    },
    {
        path: 'history',
        component: HistoryPageComponent,
        data: {
            title: 'Account'
        }
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        data: {
            title: 'Account'
        }
    }
]
