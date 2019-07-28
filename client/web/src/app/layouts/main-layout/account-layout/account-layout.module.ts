import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ACCOUNT_ROUTES } from './account-layout.routes';
import { ReferralPageComponent } from './referral-page/referral-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { BankingPageComponent } from './banking-page/banking-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { DocumentsPageComponent } from './documents-page/documents-page.component';

@NgModule({
    declarations: [
        ReferralPageComponent,
        AccountPageComponent,
        BankingPageComponent,
        HistoryPageComponent,
        SettingsPageComponent,
        DocumentsPageComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    exports: [
    ],
    providers: []
})
export class AccountLayoutModule { }
