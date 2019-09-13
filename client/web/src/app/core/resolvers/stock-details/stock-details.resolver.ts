import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { StockService } from 'src/app/services/stock/stock.service';

@Injectable()
export class StockDetailsResolver implements Resolve<any> {
  constructor(private stockService: StockService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.stockService.stockDetails(route.params.symbol)
      .catch(() => { })
  }
}