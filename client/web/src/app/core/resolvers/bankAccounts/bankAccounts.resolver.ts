import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { SelfService } from 'src/app/services/self/self.service';
import { BankingService } from 'src/app/services/banking/banking.service';

@Injectable()
export class BankAccountsResolver implements Resolve<any> {
    constructor(private bankingService: BankingService,
        private loadingService: LoadingService) { }

    resolve() {
        this.loadingService.startLoading();
        return this.bankingService.getBankAccounts()
            .catch(() => { })
            .finally(() => this.loadingService.stopLoading())
    }
}