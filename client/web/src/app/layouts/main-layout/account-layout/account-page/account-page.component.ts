import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account/account';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/core/models/portfolio/portfolio';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  account: Account;
  portfolio: Portfolio;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.account = this.route.snapshot.data.account;
    this.portfolio = this.route.snapshot.data.portfolio;

    this.portfolio.stocks = this.portfolio.stocks.sort((a, b) => a.stock.name > b.stock.name ? 1 : -1)
  }

}
