import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ACCOUNT_ROUTES } from './account-layout.routes';
import { AccountPageComponent } from './account-page/account-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { BankAccountsResolver } from 'src/app/core/resolvers/bankAccounts/bankAccounts.resolver';
import { UserDetailsResolver } from 'src/app/core/resolvers/user-details/user-details.resolver';
import { TransfersResolver } from 'src/app/core/resolvers/transfers/transfers.resolver';
import { TransactionsResolver } from 'src/app/core/resolvers/transactions/transactions.resolver';
import { PortfolioResolver } from 'src/app/core/resolvers/portfolio/portfolio.resolver';

@NgModule({
    declarations: [
        AccountPageComponent,
        BankingPageComponent,
        HistoryPageComponent,
        SettingsPageComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    exports: [
    ],
    providers: [BankAccountsResolver, UserDetailsResolver, TransfersResolver, TransactionsResolver, PortfolioResolver]
})
export class AccountLayoutModule { }
