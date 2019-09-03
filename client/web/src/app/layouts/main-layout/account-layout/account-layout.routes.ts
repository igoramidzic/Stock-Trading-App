import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { BankAccountsResolver } from 'src/app/core/resolvers/bankAccounts/bankAccounts.resolver';
import { UserDetailsResolver } from 'src/app/core/resolvers/user-details/user-details.resolver';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AccountPageComponent,
        resolve: { user: UserDetailsResolver },

        data: {
            title: 'Account'
        }
    },
    {
        path: 'banking',
        component: BankingPageComponent,
        resolve: { bankAccounts: BankAccountsResolver },
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
