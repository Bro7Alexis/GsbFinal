import { Injectable } from '@angular/core';
import { CookieService } from '@ngx-toolkit/cookie';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleService {
    role: any;
    id: any;

  constructor(  private readonly cookieSrv: CookieService) {}

   getRole() {
    const token = this.cookieSrv.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    // tslint:disable-next-line: no-string-literal
    this.role = tokenPayload['role'];

    // return role of user
    return this.role;
   }

   getId() {
    const token = this.cookieSrv.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    // tslint:disable-next-line: no-string-literal
    this.id = tokenPayload['id'];

    // return role of user
    return this.id;
   }
}
