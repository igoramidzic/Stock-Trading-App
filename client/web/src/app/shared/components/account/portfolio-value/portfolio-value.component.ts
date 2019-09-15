import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../../../core/models/account/account';
import { Portfolio } from 'src/app/core/models/portfolio/portfolio';

@Component({
  selector: 'app-portfolio-value',
  templateUrl: './portfolio-value.component.html',
  styleUrls: ['./portfolio-value.component.scss']
})
export class PortfolioValueComponent implements OnInit {

  @Input() account: Account;
  @Input() portfolio: Portfolio;

  constructor() { }

  ngOnInit() {
  }

}
