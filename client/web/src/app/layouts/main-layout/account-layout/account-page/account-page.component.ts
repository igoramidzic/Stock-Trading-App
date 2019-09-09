import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { Account } from 'src/app/core/models/account/account';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  account: Account;

  constructor(private loadingService: LoadingService, private route: ActivatedRoute) {
    this.loadingService.stopLoading();
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account;
    console.log(this.account)
  }

}
