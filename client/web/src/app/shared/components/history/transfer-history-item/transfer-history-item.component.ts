import { Component, OnInit, Input } from '@angular/core';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-transfer-history-item',
  templateUrl: './transfer-history-item.component.html',
  styleUrls: ['./transfer-history-item.component.scss']
})
export class TransferHistoryItemComponent implements OnInit {

  @Input() transfer: Transfer;
  @Input() i: number;

  constructor() { }

  ngOnInit() {
  }

}
