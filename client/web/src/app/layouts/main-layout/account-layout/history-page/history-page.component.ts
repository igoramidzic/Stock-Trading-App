import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ActivatedRoute } from '@angular/router';
import { Transfer } from 'src/app/core/models/transfer/transfer';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  transfers: Transfer[];

  constructor(private route: ActivatedRoute, private loadingService: LoadingService) {
    this.loadingService.stopLoading();
  }

  ngOnInit() {
    this.transfers = this.route.snapshot.data.transfers;
  }

}
