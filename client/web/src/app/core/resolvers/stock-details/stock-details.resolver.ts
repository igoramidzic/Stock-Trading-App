import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { StockService } from 'src/app/services/stock/stock.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ClientResponse } from '../../models/response/clientResponse';
import { StockDetails } from '../../models/stock/stockDetails';

@Injectable()
export class StockDetailsResolver implements Resolve<any> {
  constructor(private stockService: StockService,
    private loadingService: LoadingService) { }

  resolve(route: ActivatedRouteSnapshot) {
    this.loadingService.startLoading();
    return this.stockService.stockDetails(route.params.symbol)
      .catch(() => { })
      .finally(() => this.loadingService.stopLoading())
  }
}