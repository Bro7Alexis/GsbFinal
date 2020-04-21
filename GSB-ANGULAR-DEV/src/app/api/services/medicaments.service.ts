/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PaginatedDto } from '../models/paginated-dto';
import { MedicamentDto } from '../models/medicament-dto';
import { CreateMedicamentDto } from '../models/create-medicament-dto';
import { UpdateMedicamentDto } from '../models/update-medicament-dto';
@Injectable({
  providedIn: 'root',
})
class MedicamentsService extends __BaseService {
  static readonly getMedicamentsPath = '/medicaments';
  static readonly putMedicamentsPath = '/medicaments';
  static readonly getMedicamentsIdPath = '/medicaments/{id}';
  static readonly postMedicamentsIdPath = '/medicaments/{id}';
  static readonly deleteMedicamentsIdPath = '/medicaments/{id}';
  static readonly getMedicamentsComIdPath = '/medicaments/com/{id}';
  static readonly postMedicamentsUserIdDoctorDoctorIdPath = '/medicaments/{userId}/doctor/{doctorId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MedicamentsService.GetMedicamentsParams` containing the following parameters:
   *
   * - `search`: Page index for pagination
   *
   * - `pageSize`: Page size for pagination
   *
   * - `pageIndex`: Page index for pagination
   *
   * @return All medicaments
   */
  getMedicamentsResponse(params: MedicamentsService.GetMedicamentsParams): __Observable<__StrictHttpResponse<PaginatedDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.search != null) __params = __params.set('search', params.search.toString());
    if (params.pageSize != null) __params = __params.set('pageSize', params.pageSize.toString());
    if (params.pageIndex != null) __params = __params.set('pageIndex', params.pageIndex.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/medicaments`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaginatedDto>;
      })
    );
  }
  /**
   * @param params The `MedicamentsService.GetMedicamentsParams` containing the following parameters:
   *
   * - `search`: Page index for pagination
   *
   * - `pageSize`: Page size for pagination
   *
   * - `pageIndex`: Page index for pagination
   *
   * @return All medicaments
   */
  getMedicaments(params: MedicamentsService.GetMedicamentsParams): __Observable<PaginatedDto> {
    return this.getMedicamentsResponse(params).pipe(
      __map(_r => _r.body as PaginatedDto)
    );
  }

  /**
   * @param CreateMedicamentDto User to create
   * @return User found
   */
  putMedicamentsResponse(CreateMedicamentDto: CreateMedicamentDto): __Observable<__StrictHttpResponse<MedicamentDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreateMedicamentDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/medicaments`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MedicamentDto>;
      })
    );
  }
  /**
   * @param CreateMedicamentDto User to create
   * @return User found
   */
  putMedicaments(CreateMedicamentDto: CreateMedicamentDto): __Observable<MedicamentDto> {
    return this.putMedicamentsResponse(CreateMedicamentDto).pipe(
      __map(_r => _r.body as MedicamentDto)
    );
  }

  /**
   * @param id User id to retrieve
   * @return User found
   */
  getMedicamentsIdResponse(id: number): __Observable<__StrictHttpResponse<MedicamentDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/medicaments/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MedicamentDto>;
      })
    );
  }
  /**
   * @param id User id to retrieve
   * @return User found
   */
  getMedicamentsId(id: number): __Observable<MedicamentDto> {
    return this.getMedicamentsIdResponse(id).pipe(
      __map(_r => _r.body as MedicamentDto)
    );
  }

  /**
   * @param params The `MedicamentsService.PostMedicamentsIdParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * - `UpdateMedicamentDto`:
   *
   * @return User updated
   */
  postMedicamentsIdResponse(params: MedicamentsService.PostMedicamentsIdParams): __Observable<__StrictHttpResponse<MedicamentDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.UpdateUserDto;
    __body = params.UpdateMedicamentDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/medicaments/${encodeURIComponent(params.id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MedicamentDto>;
      })
    );
  }
  /**
   * @param params The `MedicamentsService.PostMedicamentsIdParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * - `UpdateMedicamentDto`:
   *
   * @return User updated
   */
  postMedicamentsId(params: MedicamentsService.PostMedicamentsIdParams): __Observable<MedicamentDto> {
    return this.postMedicamentsIdResponse(params).pipe(
      __map(_r => _r.body as MedicamentDto)
    );
  }

  /**
   * @param id medicament id to delete
   */
  deleteMedicamentsIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/medicaments/${encodeURIComponent(id)}`,
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
   * @param id medicament id to delete
   */
  deleteMedicamentsId(id: number): __Observable<null> {
    return this.deleteMedicamentsIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id User id to retrieve
   * @return User found
   */
  getMedicamentsComIdResponse(id: number): __Observable<__StrictHttpResponse<MedicamentDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/medicaments/com/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MedicamentDto>;
      })
    );
  }
  /**
   * @param id User id to retrieve
   * @return User found
   */
  getMedicamentsComId(id: number): __Observable<MedicamentDto> {
    return this.getMedicamentsComIdResponse(id).pipe(
      __map(_r => _r.body as MedicamentDto)
    );
  }

  /**
   * @param params The `MedicamentsService.PostMedicamentsUserIdDoctorDoctorIdParams` containing the following parameters:
   *
   * - `id`: User id to update
   *
   * - `UpdateUserDto`: User information to update
   *
   * - `UpdateMedicamentDto`:
   *
   * @return User updated
   */
  // postMedicamentsUserIdDoctorDoctorIdResponse(params: MedicamentsService.PostMedicamentsUserIdDoctorDoctorIdParams): __Observable<__StrictHttpResponse<MedicamentDto>> {
  //   let __params = this.newParams();
  //   let __headers = new HttpHeaders();
  //   let __body: any = null;

  //   __body = params.UpdateUserDto;
  //   __body = params.UpdateMedicamentDto;
  //   let req = new HttpRequest<any>(
  //     'POST',
  //     this.rootUrl + `/medicaments/${encodeURIComponent(params.userId)}/doctor/${encodeURIComponent(params.doctorId)}`,
  //     __body,
  //     {
  //       headers: __headers,
  //       params: __params,
  //       responseType: 'json'
  //     });

  //   return this.http.request<any>(req).pipe(
  //     __filter(_r => _r instanceof HttpResponse),
  //     __map((_r) => {
  //       return _r as __StrictHttpResponse<MedicamentDto>;
  //     })
  //   );
  // }
  // /**
  //  * @param params The `MedicamentsService.PostMedicamentsUserIdDoctorDoctorIdParams` containing the following parameters:
  //  *
  //  * - `id`: User id to update
  //  *
  //  * - `UpdateUserDto`: User information to update
  //  *
  //  * - `UpdateMedicamentDto`:
  //  *
  //  * @return User updated
  //  */
  // postMedicamentsUserIdDoctorDoctorId(params: MedicamentsService.PostMedicamentsUserIdDoctorDoctorIdParams): __Observable<MedicamentDto> {
  //   return this.postMedicamentsUserIdDoctorDoctorIdResponse(params).pipe(
  //     __map(_r => _r.body as MedicamentDto)
  //   );
  // }
}

module MedicamentsService {

  /**
   * Parameters for getMedicaments
   */
  export interface GetMedicamentsParams {

    /**
     * Page index for pagination
     */
    search: string;

    /**
     * Page size for pagination
     */
    pageSize: number;

    /**
     * Page index for pagination
     */
    pageIndex: number;
  }

  /**
   * Parameters for postMedicamentsId
   */
  export interface PostMedicamentsIdParams {

    /**
     * User id to update
     */
    id: number;

    /**
     * User information to update
     */
    UpdateUserDto: UpdateMedicamentDto;
    UpdateMedicamentDto: UpdateMedicamentDto;
  }

  /**
   * Parameters for postMedicamentsUserIdDoctorDoctorId
   */
  export interface PostMedicamentsUserIdDoctorDoctorIdParams {

    /**
     * User id to update
     */
    id: number;

    /**
     * User information to update
     */
    UpdateUserDto: UpdateMedicamentDto;
    UpdateMedicamentDto: UpdateMedicamentDto;
  }
}

export { MedicamentsService }
