/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TokenDto } from '../models/token-dto';
import { CheckCredentialDto } from '../models/check-credential-dto';
import { UserDto } from '../models/user-dto';
import { CreateUserDto } from '../models/create-user-dto';
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly postAuthLoginPath = '/auth/login';
  static readonly putAuthSignupPath = '/auth/signup';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param CheckCredentialDto User credential to check
   * @return User authentificated token
   */
  postAuthLoginResponse(CheckCredentialDto: CheckCredentialDto): __Observable<__StrictHttpResponse<TokenDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CheckCredentialDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/login`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<TokenDto>;
      })
    );
  }
  /**
   * @param CheckCredentialDto User credential to check
   * @return User authentificated token
   */
  postAuthLogin(CheckCredentialDto: CheckCredentialDto): __Observable<TokenDto> {
    return this.postAuthLoginResponse(CheckCredentialDto).pipe(
      __map(_r => _r.body as TokenDto)
    );
  }

  /**
   * @param CreateUserDto User to create
   * @return User created
   */
  putAuthSignupResponse(CreateUserDto: CreateUserDto): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreateUserDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/signup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDto>;
      })
    );
  }
  /**
   * @param CreateUserDto User to create
   * @return User created
   */
  putAuthSignup(CreateUserDto: CreateUserDto): __Observable<UserDto> {
    return this.putAuthSignupResponse(CreateUserDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }
}

module AuthService {
}

export { AuthService }
