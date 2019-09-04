import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AccountService } from 'src/app/services/account/account.service';

@Injectable()
export class AccountResolver implements Resolve<any> {
    constructor(private accountService: AccountService,
        private loadingService: LoadingService) { }

    resolve() {
        this.loadingService.startLoading();
        return this.accountService.getAccount()
            .catch(() => { })
    }
}