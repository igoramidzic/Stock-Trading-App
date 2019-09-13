import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  transfers: Transfer[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.transfers = this.route.snapshot.data.transfers;
  }

}
