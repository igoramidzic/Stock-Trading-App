import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

@Injectable()
export class OwnedStockResolver implements Resolve<any> {
    constructor(private portfolioService: PortfolioService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.portfolioService.getOwnedStock(route.params.symbol)
            .catch(() => { })
    }
}