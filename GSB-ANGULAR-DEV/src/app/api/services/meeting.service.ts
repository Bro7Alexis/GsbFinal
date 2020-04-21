/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MeetingDto } from '../models/meeting-dto';
import { HoursDto } from '../models/hours-dto';
import { CreateMeetingDto } from '../models/create-meeting-dto';
@Injectable({
  providedIn: 'root',
})
class MeetingService extends __BaseService {
  static readonly getMeetingIdPath = '/meeting/{id}';
  static readonly getMeetingSearchDateIdPath = '/meeting/search/{date}/{id}';
  static readonly putMeetingPath = '/meeting';
  static readonly postMeetingIdAcceptPath = '/meeting/{id}/accept';
  static readonly postMeetingIdDeclinePath = '/meeting/{id}/decline';

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
  getMeetingIdResponse(id: number): __Observable<__StrictHttpResponse<Array<MeetingDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/meeting/${encodeURIComponent(id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MeetingDto>>;
      })
    );
  }
  /**
   * @param id undefined
   * @return User meetings
   */
  getMeetingId(id: number): __Observable<Array<MeetingDto>> {
    return this.getMeetingIdResponse(id).pipe(
      __map(_r => _r.body as Array<MeetingDto>)
    );
  }

  /**
   * @param params The `MeetingService.GetMeetingSearchDateIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `date`:
   *
   * @return User meetings
   */
  getMeetingSearchDateIdResponse(params: MeetingService.GetMeetingSearchDateIdParams): __Observable<__StrictHttpResponse<Array<HoursDto>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/meeting/search/${encodeURIComponent(params.date)}/${encodeURIComponent(params.id)}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<HoursDto>>;
      })
    );
  }
  /**
   * @param params The `MeetingService.GetMeetingSearchDateIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `date`:
   *
   * @return User meetings
   */
  getMeetingSearchDateId(params: MeetingService.GetMeetingSearchDateIdParams): __Observable<Array<HoursDto>> {
    return this.getMeetingSearchDateIdResponse(params).pipe(
      __map(_r => _r.body as Array<HoursDto>)
    );
  }

  /**
   * @param CreateMeetingDto Meeting to create
   * @return User found
   */
  putMeetingResponse(CreateMeetingDto: CreateMeetingDto): __Observable<__StrictHttpResponse<MeetingDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = CreateMeetingDto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/meeting`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MeetingDto>;
      })
    );
  }
  /**
   * @param CreateMeetingDto Meeting to create
   * @return User found
   */
  putMeeting(CreateMeetingDto: CreateMeetingDto): __Observable<MeetingDto> {
    return this.putMeetingResponse(CreateMeetingDto).pipe(
      __map(_r => _r.body as MeetingDto)
    );
  }

  /**
   * @param id Meeting identifier to accept
   * @return Accepted Meeting
   */
  postMeetingIdAcceptResponse(id: number): __Observable<__StrictHttpResponse<MeetingDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/meeting/${encodeURIComponent(id)}/accept`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MeetingDto>;
      })
    );
  }
  /**
   * @param id Meeting identifier to accept
   * @return Accepted Meeting
   */
  postMeetingIdAccept(id: number): __Observable<MeetingDto> {
    return this.postMeetingIdAcceptResponse(id).pipe(
      __map(_r => _r.body as MeetingDto)
    );
  }

  /**
   * @param id Meeting identifier to decline
   * @return Declined Meeting
   */
  postMeetingIdDeclineResponse(id: number): __Observable<__StrictHttpResponse<MeetingDto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/meeting/${encodeURIComponent(id)}/decline`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<MeetingDto>;
      })
    );
  }
  /**
   * @param id Meeting identifier to decline
   * @return Declined Meeting
   */
  postMeetingIdDecline(id: number): __Observable<MeetingDto> {
    return this.postMeetingIdDeclineResponse(id).pipe(
      __map(_r => _r.body as MeetingDto)
    );
  }
}

module MeetingService {

  /**
   * Parameters for getMeetingSearchDateId
   */
  export interface GetMeetingSearchDateIdParams {
    id: number;
    date: string;
  }
}

export { MeetingService }
