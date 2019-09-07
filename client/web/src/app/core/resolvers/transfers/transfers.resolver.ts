import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Injectable()
export class TransfersResolver implements Resolve<any> {
    constructor(private transferService: TransferService,
        private loadingService: LoadingService) { }

    resolve() {
        this.loadingService.startLoading();
        return this.transferService.getTransfers()
            .catch(() => { })
    }
}