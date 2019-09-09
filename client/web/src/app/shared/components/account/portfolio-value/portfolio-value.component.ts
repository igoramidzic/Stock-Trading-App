import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../../../core/models/account/account';

@Component({
  selector: 'app-portfolio-value',
  templateUrl: './portfolio-value.component.html',
  styleUrls: ['./portfolio-value.component.scss']
})
export class PortfolioValueComponent implements OnInit {

  @Input() account: Account;
  @Input() stockValue: number;
  @Input() cashValue: number;

  constructor() { }

  ngOnInit() {
  }

}
