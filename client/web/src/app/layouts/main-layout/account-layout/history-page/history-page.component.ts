import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transfer } from 'src/app/core/models/transfer/transfer';
import { Transaction } from 'src/app/core/models/transaction/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  transfers: Transfer[];
  transactions: Transaction[];

  combinedItems: CombinedTrans[];

  filter: string = "all";

  constructor(private transactionService: TransactionService,
    private transferService: TransferService) { }

  ngOnInit() {
    Promise.all([this.transferService.getTransfers(), this.transactionService.getTransactions()])
      .then((result: any[]) => {
        this.transfers = result[0];
        this.transactions = result[1];
        this.filterItems(this.filter);
      })
  }

  filterItems(filter: string): void {
    this.filter = filter;
    this.combineItems(this.transfers, this.transactions);

    if (filter != 'all')
      this.combinedItems = this.combinedItems.filter(i => i.type == filter);
  }

  combineItems(transfers: Transfer[], transactions: Transaction[]): void {
    this.combinedItems = [];
    for (let i = 0; i < transfers.length; i++) {
      this.combinedItems.push({
        createdAt: transfers[i].createdAt,
        updatedAt: transfers[i].updatedAt,
        type: 'transfer',
        transfer: transfers[i]
      })
    }

    for (let i = 0; i < transactions.length; i++) {
      this.combinedItems.push({
        createdAt: transactions[i].createdAt,
        updatedAt: transactions[i].updatedAt,
        type: 'transaction',
        transaction: transactions[i]
      })
    }

    this.combinedItems = this.combinedItems.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
  }
}

export interface CombinedTrans {
  createdAt: Date;
  updatedAt: Date;
  type: string;

  transaction?: Transaction;
  transfer?: Transfer;

}
