import { Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { BankAccountsResolver } from 'src/app/core/resolvers/bankAccounts/bankAccounts.resolver';
import { UserDetailsResolver } from 'src/app/core/resolvers/user-details/user-details.resolver';
import { AccountResolver } from 'src/app/core/resolvers/account/account.resolver';
import { TransfersResolver } from 'src/app/core/resolvers/transfers/transfers.resolver';
import { TransactionsResolver } from 'src/app/core/resolvers/transactions/transactions.resolver';
import { PortfolioResolver } from 'src/app/core/resolvers/portfolio/portfolio.resolver';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AccountPageComponent,
        resolve: { account: AccountResolver, portfolio: PortfolioResolver },
        data: {
            title: 'Account'
        }
    },
    {
        path: 'banking',
        component: BankingPageComponent,
        resolve: { bankAccounts: BankAccountsResolver, account: AccountResolver },
        data: {
            title: 'Account'
        }
    },
    {
        path: 'history',
        component: HistoryPageComponent,
        resolve: { transfers: TransfersResolver, transactions: TransactionsResolver },
        data: {
            title: 'Account'
        }
    },
    {
        path: 'settings',
        component: SettingsPageComponent,
        resolve: { user: UserDetailsResolver },
        data: {
            title: 'Account'
        }
    }
]
