import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SelfService } from 'src/app/services/self/self.service';
import { ClientResponse } from '../../models/response/clientResponse';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SelfGuard implements CanActivate {

  constructor(private selfService: SelfService, private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.selfService.getSelf()
        .then((res: ClientResponse) => {
          this.selfService.updateSelf(res.result.user)
          resolve(true);
        })
        .catch((res: ClientResponse) => {
          this.authService.logout();
          resolve(false);
        })
    })
  }
}
