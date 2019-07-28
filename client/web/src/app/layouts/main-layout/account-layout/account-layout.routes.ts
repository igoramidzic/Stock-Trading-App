import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { ReferralPageComponent } from './referral-page/referral-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';

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
        path: 'referral',
        component: ReferralPageComponent,
        data: {
            title: 'Referral'
        }
    },
    {
        path: 'banking',
        component: BankingPageComponent,
        data: {
            title: 'Banking'
        }
    },
    {
        path: 'history',
        component: HistoryPageComponent,
        data: {
            title: 'History'
        }
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        data: {
            title: 'Settings'
        }
    },
    {
        path: 'documents',
        component: DocumentsPageComponent,
        data: {
            title: 'Documents'
        }
    }
]
