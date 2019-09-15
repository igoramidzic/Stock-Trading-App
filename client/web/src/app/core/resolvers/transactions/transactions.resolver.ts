import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Injectable()
export class TransactionsResolver implements Resolve<any> {
    constructor(private transactionService: TransactionService) { }

    resolve() {
        return this.transactionService.getTransactions()
            .catch(() => { })
    }
}