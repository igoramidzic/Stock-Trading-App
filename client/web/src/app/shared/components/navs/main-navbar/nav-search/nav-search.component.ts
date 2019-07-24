import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StockService } from 'src/app/services/stock/stock.service';
import { Quote } from 'src/app/core/models/stock/quote';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';
import { StockDetails } from '../../../../../core/models/stock/stockDetails';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  searchForm: FormGroup;
  stocks: StockDetails[];

  constructor(private fb: FormBuilder, private stockService: StockService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: new FormControl('')
    })

    this.searchForm.controls['search'].valueChanges.subscribe((value: string) => {
      if (value == '')
        this.stocks = null;
      else
        this.search(value);
    })
  }

  search(partial: string): void {
    if (partial == '')
      return;

    this.stockService.search(partial)
      .then((stocks: StockDetails[]) => {
        this.stocks = stocks
      })
      .catch((err: ClientResponse) => {
        this.stocks = null;
      })
  }
}
