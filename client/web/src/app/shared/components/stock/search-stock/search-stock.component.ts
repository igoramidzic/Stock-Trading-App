import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StockDetails } from 'src/app/core/models/stock/stockDetails';
import { StockService } from 'src/app/services/stock/stock.service';
import { ClientResponse } from 'src/app/core/models/response/clientResponse';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.scss']
})
export class SearchStockComponent implements OnInit {
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
