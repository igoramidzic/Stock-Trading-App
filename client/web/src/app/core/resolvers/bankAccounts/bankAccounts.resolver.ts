import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BankingService } from 'src/app/services/banking/banking.service';

@Injectable()
export class BankAccountsResolver implements Resolve<any> {
    constructor(private bankingService: BankingService) { }

    resolve() {
        return this.bankingService.getBankAccounts()
            .catch(() => { })
    }
}