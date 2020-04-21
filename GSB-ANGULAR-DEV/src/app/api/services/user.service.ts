/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { UserDto } from '../models/user-dto';
import { CreateUserDto } from '../models/create-user-dto';
import { UpdateUserDto } from '../models/update-user-dto';
@Injectable({
  providedIn: 'root',
})
class UserService extends __BaseService {
  static readonly getUserPath = '/user';
  static readonly putUserPath = '/user';
  static readonly getUserMePath = '/user/me';
  static readonly getUserCommercialsPath = '/user/commercials';
  static readonly getUserDoctorsPath = '/user/doctors';
  static readonly getUserIdPath = '/user/{id}';
  static readonly postUserIdPath = '/user/{id}';
  static readonly deleteUserIdPath = '/user/{id}';
  static readonly postUserProfilPath = '/user/profil';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UserService.GetUserParams` containing the following parameters:
   *
   * - `role`: role to retrieve
   *
   * - `name`: Name to retrieve
   *
   * - `lastname`: Lastname to retrieve
   *
   * - `email`: Email to retrieve
   *
   * @return All users
   */
  getUserResponse(params: UserService.GetUserParams): __Observable<__StrictHttpResponse<Array<UserDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.role != null) __params = __params.set('role', params.role.toString());
    if (params.name != null) __params = __params.set('name', params.name.toString());
    if (params.lastname != null) __params = __params.set('lastname', params.lastname.toString());
    if (params.email != null) __params = __params.set('email', params.email.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UserDto>>;
      })
    );
  }
  /**
   * @param params The `UserService.GetUserParams` containing the following parameters:
   *
   * - `role`: role to retrieve
   *
   * - `name`: Name to retrieve
   *
   * - `lastname`: Lastname to retrieve
   *
   * - `email`: Email to retrieve
   *
   * @return All users
   */
  getUser(params: UserService.GetUserParams): __Observable<Array<UserDto>> {
    return this.getUserResponse(params).pipe(
      __map(_r => _r.body as Array<UserDto>)
    );
  }

  /**
   * @param CreateUserDto User to create
   * @return User found
   */
  putUserResponse(CreateUserDto: CreateUserDto): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreateUserDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/user`,
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
   * @return User found
   */
  putUser(CreateUserDto: CreateUserDto): __Observable<UserDto> {
    return this.putUserResponse(CreateUserDto).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @return User found
   */
  getUserMeResponse(): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/me`,
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
   * @return User found
   */
  getUserMe(): __Observable<UserDto> {
    return this.getUserMeResponse().pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @return commercials found
   */
  getUserCommercialsResponse(): __Observable<__StrictHttpResponse<Array<UserDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/commercials`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UserDto>>;
      })
    );
  }
  /**
   * @return commercials found
   */
  getUserCommercials(): __Observable<Array<UserDto>> {
    return this.getUserCommercialsResponse().pipe(
      __map(_r => _r.body as Array<UserDto>)
    );
  }

  /**
   * @return Doctors found
   */
  getUserDoctorsResponse(): __Observable<__StrictHttpResponse<Array<UserDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/doctors`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<UserDto>>;
      })
    );
  }
  /**
   * @return Doctors found
   */
  getUserDoctors(): __Observable<Array<UserDto>> {
    return this.getUserDoctorsResponse().pipe(
      __map(_r => _r.body as Array<UserDto>)
    );
  }

  /**
   * @param id User id to retrieve
   * @return User found
   */
  getUserIdResponse(id: number): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/user/${encodeURIComponent(id)}`,
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
   * @param id User id to retrieve
   * @return User found
   */
  getUserId(id: number): __Observable<UserDto> {
    return this.getUserIdResponse(id).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param params The `UserService.PostUserIdParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * @return User updated
   */
  postUserIdResponse(params: UserService.PostUserIdParams): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.UpdateUserDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/user/${encodeURIComponent(params.id)}`,
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
   * @param params The `UserService.PostUserIdParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * @return User updated
   */
  postUserId(params: UserService.PostUserIdParams): __Observable<UserDto> {
    return this.postUserIdResponse(params).pipe(
      __map(_r => _r.body as UserDto)
    );
  }

  /**
   * @param id User id to delete
   */
  deleteUserIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/user/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id User id to delete
   */
  deleteUserId(id: number): __Observable<null> {
    return this.deleteUserIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `UserService.PostUserProfilParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * @return User updated
   */
  postUserProfilResponse(params: UserService.PostUserProfilParams): __Observable<__StrictHttpResponse<UserDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.UpdateUserDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/user/profil`,
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
   * @param params The `UserService.PostUserProfilParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * @return User updated
   */
  postUserProfil(params: UserService.PostUserProfilParams): __Observable<UserDto> {
    return this.postUserProfilResponse(params).pipe(
      __map(_r => _r.body as UserDto)
    );
  }
}

module UserService {

  /**
   * Parameters for getUser
   */
  export interface GetUserParams {

    /**
     * role to retrieve
     */
    role: number;

    /**
     * Name to retrieve
     */
    name: string;

    /**
     * Lastname to retrieve
     */
    lastname: string;

    /**
     * Email to retrieve
     */
    email: string;
  }

  /**
   * Parameters for postUserId
   */
  export interface PostUserIdParams {

    /**
     * User id to update
     */
    id: number;

    /**
     * User information to update
     */
    UpdateUserDto: UpdateUserDto;
  }

  /**
   * Parameters for postUserProfil
   */
  export interface PostUserProfilParams {

    /**
     * User id to update
     */
    id: number;

    /**
     * User information to update
     */
    UpdateUserDto: UpdateUserDto;
  }
}

export { UserService }
