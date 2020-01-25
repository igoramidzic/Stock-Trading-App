import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/core/models/account/account';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/core/models/portfolio/portfolio';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';
import { AccountService } from 'src/app/services/account/account.service';
import { StockQuote } from 'src/app/core/models/stock/quote';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  account: Account;
  portfolio: Portfolio;

  constructor(private portfolioService: PortfolioService, private accountService: AccountService) { }

  ngOnInit() {
    this.getPortfolio();
    this.getAccount();
  }

  getPortfolio() {
    this.portfolioService.getPortfolio()
      .then((portfolio: Portfolio) => {
        this.portfolio = portfolio;
        this.portfolio.stocks = this.portfolio.stocks.sort((a, b) => a.stock.name > b.stock.name ? 1 : -1)
      })
      .catch(() => { });
  }

  getAccount() {
    this.accountService.getAccount()
      .then((account: Account) => {
        this.account = account;
      })
      .catch(() => { });
  }

  get emptyPortfolioStocks(): StockQuote[] {
    let list: StockQuote[] = new Array(!this.portfolio ? 3 : this.portfolio.stocks.length);
    return list;
  }
}
