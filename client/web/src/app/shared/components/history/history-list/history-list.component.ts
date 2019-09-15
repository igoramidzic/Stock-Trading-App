import { Component, OnInit, Input } from '@angular/core';
import { CombinedTrans } from 'src/app/layouts/main-layout/account-layout/history-page/history-page.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {

  @Input() combinedItems: CombinedTrans[];

  constructor() { }

  ngOnInit() {
  }

}
