import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Injectable()
export class AlreadyWatchingResolver implements Resolve<any> {
    constructor(private watchlistService: WatchlistService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.watchlistService.getIfAlreadyWatching(route.parent.data.stockDetails._id)
            .catch(() => { })
    }
}