import { Component, OnInit, Input } from '@angular/core';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-transfer-history-list',
  templateUrl: './transfer-history-list.component.html',
  styleUrls: ['./transfer-history-list.component.scss']
})
export class TransferHistoryListComponent implements OnInit {

  @Input() transfers: Transfer[];

  constructor() { }

  ngOnInit() {
  }

}
