import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';

@Injectable()
export class AccountResolver implements Resolve<any> {
    constructor(private accountService: AccountService) { }

    resolve() {
        return this.accountService.getAccount()
            .catch(() => { })
    }
}