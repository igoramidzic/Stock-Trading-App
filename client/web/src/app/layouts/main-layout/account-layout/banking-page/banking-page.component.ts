import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-banking-page',
  templateUrl: './banking-page.component.html',
  styleUrls: ['./banking-page.component.scss']
})
export class BankingPageComponent implements OnInit {

  bankAccounts: BankAccount[];
  account: Account;

  constructor(private route: ActivatedRoute, private loadingService: LoadingService) {
    this.loadingService.stopLoading();
  }

  ngOnInit() {
    this.bankAccounts = this.route.snapshot.data.bankAccounts;
    this.account = this.route.snapshot.data.account
  }

  accountCreated(bankAccount: BankAccount): void {
    this.bankAccounts.push(bankAccount);
  }

  accountDeleted(bankAccount: BankAccount): void {
    this.bankAccounts = this.bankAccounts.filter(a => a._id != bankAccount._id);
  }
}
