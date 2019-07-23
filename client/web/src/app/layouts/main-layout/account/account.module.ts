import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ACCOUNT_ROUTES } from './account.routes';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ACCOUNT_ROUTES)
    ],
    exports: [
    ],
    providers: []
})
export class AccountModule { }
