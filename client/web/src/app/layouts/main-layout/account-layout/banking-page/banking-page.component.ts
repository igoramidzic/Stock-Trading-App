import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banking-page',
  templateUrl: './banking-page.component.html',
  styleUrls: ['./banking-page.component.scss']
})
export class BankingPageComponent implements OnInit {

  bankAccounts: BankAccount[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.bankAccounts = this.route.snapshot.data.bankAccounts;
  }

  accountCreated(bankAccount: BankAccount): void {
    console.log(this.bankAccounts)
    this.bankAccounts.push(bankAccount);
    console.log(this.bankAccounts)
  }

  accountDeleted(bankAccount: BankAccount): void {
    this.bankAccounts = this.bankAccounts.filter(a => a._id != bankAccount._id);
  }
}
