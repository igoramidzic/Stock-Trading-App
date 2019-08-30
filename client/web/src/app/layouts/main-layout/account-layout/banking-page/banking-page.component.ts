import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'src/app/core/models/banking/banking';

@Component({
  selector: 'app-banking-page',
  templateUrl: './banking-page.component.html',
  styleUrls: ['./banking-page.component.scss']
})
export class BankingPageComponent implements OnInit {

  bankAccounts: BankAccount[];

  constructor() { }

  ngOnInit() {
    this.bankAccounts = [
      { _id: "1", name: 'Wells Fargo Checking' },
      { _id: "2", name: 'Capital One Checking' }
    ];
  }

}
