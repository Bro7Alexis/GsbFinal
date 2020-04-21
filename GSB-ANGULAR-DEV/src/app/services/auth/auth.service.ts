import { Injectable } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly cookieSrv: CookieService,
    private readonly router: Router,
  ) { }

  getToken(): string {
    return this.cookieSrv.getItem('token');
  }

  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    const jwtService: JwtHelperService = new JwtHelperService();
    return !jwtService.isTokenExpired(token);
  }

  logout(): void {
    this.cookieSrv.clear();
    this.router.navigate(['login']);
  }

}
