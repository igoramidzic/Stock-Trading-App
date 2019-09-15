import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio/portfolio.service';

@Injectable()
export class PortfolioResolver implements Resolve<any> {
    constructor(private portfolioService: PortfolioService) { }

    resolve() {
        return this.portfolioService.getPortfolio()
            .catch(() => { })
    }
}