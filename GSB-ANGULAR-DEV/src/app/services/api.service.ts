import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApiService(route: string, data?: any): Observable<any> {
    const params: HttpParams = new HttpParams({fromObject: data});
    const path = `${environment.basePath}/${route}`; // backquote pour enlever la concatenation en typescript
    return this.http.get(path, data);
  }

  postApiService({ route, data }: { route: string; data?: any; }): Observable<any> {
    const path = `${environment.basePath}/${route}`;
    return this.http.post(path, data);
  }

}
