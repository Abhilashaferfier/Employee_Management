import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService {


  

  private readonly apiUrl =
    `${environment.apiUrl}/leaves`;


  

  constructor(
    private http: HttpClient
  ) {}


  
  getMyLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/my`
    );

  }


  

  createLeave(
    payload: any
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      payload
    );

  }

}