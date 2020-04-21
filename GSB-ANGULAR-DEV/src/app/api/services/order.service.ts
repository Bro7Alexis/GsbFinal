/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrderDto } from '../models/order-dto';
import { Order } from '../models/order';
import { CreatOrderDto } from '../models/creat-order-dto';
@Injectable({
  providedIn: 'root',
})
class OrderService extends __BaseService {
  static readonly getOrderIdPath = '/order/{id}';
  static readonly putOrderPath = '/order';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   * @return User meetings
   */
  getOrderIdResponse(id: number): __Observable<__StrictHttpResponse<Array<OrderDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/order/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderDto>>;
      })
    );
  }
  /**
   * @param id undefined
   * @return User meetings
   */
  getOrderId(id: number): __Observable<Array<OrderDto>> {
    return this.getOrderIdResponse(id).pipe(
      __map(_r => _r.body as Array<OrderDto>)
    );
  }

  /**
   * @param CreatOrderDto Order to create
   * @return User found
   */
  putOrderResponse(CreatOrderDto: CreatOrderDto): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreatOrderDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/order`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param CreatOrderDto Order to create
   * @return User found
   */
  putOrder(CreatOrderDto: CreatOrderDto): __Observable<Order> {
    return this.putOrderResponse(CreatOrderDto).pipe(
      __map(_r => _r.body as Order)
    );
  }
}

module OrderService {
}

export { OrderService }
