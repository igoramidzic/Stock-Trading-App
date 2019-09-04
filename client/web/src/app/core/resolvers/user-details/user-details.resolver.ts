import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { SelfService } from 'src/app/services/self/self.service';

@Injectable()
export class UserDetailsResolver implements Resolve<any> {
    constructor(private selfService: SelfService,
        private loadingService: LoadingService) { }

    resolve() {
        this.loadingService.startLoading();
        return this.selfService.getSelf()
            .catch(() => { })
    }
}