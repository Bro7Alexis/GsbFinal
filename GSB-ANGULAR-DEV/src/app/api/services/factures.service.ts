/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { FactureDto } from '../models/facture-dto';
import { CreateFactureDto } from '../models/create-facture-dto';
import { UpdateFactureDto } from '../models/update-facture-dto';
@Injectable({
  providedIn: 'root',
})
class FacturesService extends __BaseService {
  static readonly getFacturesPath = '/factures';
  static readonly putFacturesPath = '/factures';
  static readonly getFacturesIdPath = '/factures/{id}';
  static readonly postFacturesIdPath = '/factures/{id}';
  static readonly deleteFacturesIdPath = '/factures/{id}';
  static readonly getFacturesDoctorIdPath = '/factures/doctor/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return All factures
   */
  getFacturesResponse(): __Observable<__StrictHttpResponse<Array<FactureDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/factures`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<FactureDto>>;
      })
    );
  }
  /**
   * @return All factures
   */
  getFactures(): __Observable<Array<FactureDto>> {
    return this.getFacturesResponse().pipe(
      __map(_r => _r.body as Array<FactureDto>)
    );
  }

  /**
   * @param CreateFactureDto Facture to create
   * @return Facture found
   */
  putFacturesResponse(CreateFactureDto: CreateFactureDto): __Observable<__StrictHttpResponse<FactureDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreateFactureDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/factures`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FactureDto>;
      })
    );
  }
  /**
   * @param CreateFactureDto Facture to create
   * @return Facture found
   */
  putFactures(CreateFactureDto: CreateFactureDto): __Observable<FactureDto> {
    return this.putFacturesResponse(CreateFactureDto).pipe(
      __map(_r => _r.body as FactureDto)
    );
  }

  /**
   * @param id Facture id to retrieve
   * @return Facture found
   */
  getFacturesIdResponse(id: number): __Observable<__StrictHttpResponse<FactureDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/factures/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FactureDto>;
      })
    );
  }
  /**
   * @param id Facture id to retrieve
   * @return Facture found
   */
  getFacturesId(id: number): __Observable<FactureDto> {
    return this.getFacturesIdResponse(id).pipe(
      __map(_r => _r.body as FactureDto)
    );
  }

  /**
   * @param params The `FacturesService.PostFacturesIdParams` containing the following parameters:
   *
   * - `id`: Facture id to update
   *
   * - `UpdateFactureDto`: Facture information to update
   *
   * @return Facture updated
   */
  postFacturesIdResponse(params: FacturesService.PostFacturesIdParams): __Observable<__StrictHttpResponse<FactureDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.UpdateFactureDto;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/factures/${encodeURIComponent(params.id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FactureDto>;
      })
    );
  }
  /**
   * @param params The `FacturesService.PostFacturesIdParams` containing the following parameters:
   *
   * - `id`: Facture id to update
   *
   * - `UpdateFactureDto`: Facture information to update
   *
   * @return Facture updated
   */
  postFacturesId(params: FacturesService.PostFacturesIdParams): __Observable<FactureDto> {
    return this.postFacturesIdResponse(params).pipe(
      __map(_r => _r.body as FactureDto)
    );
  }

  /**
   * @param id Facture id to delete
   */
  deleteFacturesIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/factures/${encodeURIComponent(id)}`,
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
   * @param id Facture id to delete
   */
  deleteFacturesId(id: number): __Observable<null> {
    return this.deleteFacturesIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id Facture from doctorId to retrieve
   * @return Facture found
   */
  getFacturesDoctorIdResponse(id: number): __Observable<__StrictHttpResponse<FactureDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/factures/doctor/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FactureDto>;
      })
    );
  }
  /**
   * @param id Facture from doctorId to retrieve
   * @return Facture found
   */
  getFacturesDoctorId(id: number): __Observable<FactureDto> {
    return this.getFacturesDoctorIdResponse(id).pipe(
      __map(_r => _r.body as FactureDto)
    );
  }
}

module FacturesService {

  /**
   * Parameters for postFacturesId
   */
  export interface PostFacturesIdParams {

    /**
     * Facture id to update
     */
    id: number;

    /**
     * Facture information to update
     */
    UpdateFactureDto: UpdateFactureDto;
  }
}

export { FacturesService }
