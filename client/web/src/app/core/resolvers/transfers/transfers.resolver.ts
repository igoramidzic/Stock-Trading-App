import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Injectable()
export class TransfersResolver implements Resolve<any> {
    constructor(private transferService: TransferService) { }

    resolve() {
        return this.transferService.getTransfers()
            .catch(() => { })
    }
}