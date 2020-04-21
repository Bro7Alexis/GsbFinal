import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import { AuthService } from '../../auth/auth.service';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService,
              public router: Router,
              private readonly cookieSrv: CookieService
              ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.cookieSrv.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      // tslint:disable-next-line: no-string-literal
      !this.auth.isAuthenticated() || tokenPayload['role'] !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


}
