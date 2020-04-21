/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly getPath = '/';
  static readonly postAvatarPath = '/avatar';
  static readonly getAvatarImgpathPath = '/avatar/{imgpath}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/`,
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
  }  get(): __Observable<null> {
    return this.getResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  postAvatarResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/avatar`,
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
  }  postAvatar(): __Observable<null> {
    return this.postAvatarResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  // getAvatarImgpathResponse(): __Observable<__StrictHttpResponse<null>> {
  //   let __params = this.newParams();
  //   let __headers = new HttpHeaders();
  //   let __body: any = null;
  //   let req = new HttpRequest<any>(
  //     'GET',
  //     this.rootUrl + `/avatar/${encodeURIComponent(imgpath)}`,
  //     __body,
  //     {
  //       headers: __headers,
  //       params: __params,
  //       responseType: 'json'
  //     });

  //   return this.http.request<any>(req).pipe(
  //     __filter(_r => _r instanceof HttpResponse),
  //     __map((_r) => {
  //       return _r as __StrictHttpResponse<null>;
  //     })
  //   );
  // }  getAvatarImgpath(): __Observable<null> {
  //   return this.getAvatarImgpathResponse().pipe(
  //     __map(_r => _r.body as null)
  //   );
  // }
}

module ApiService {
}

export { ApiService }
