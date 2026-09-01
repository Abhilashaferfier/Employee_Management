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


// =====================================================
// LEAVE REQUEST SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService {


  // =====================================================
  // BASE API URL
  // =====================================================

  private readonly apiUrl =
    `${environment.apiUrl}/leaves`;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET MY LEAVE REQUESTS
  // =====================================================

  getMyLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/my`
    );

  }


  // =====================================================
  // CREATE LEAVE REQUEST
  // =====================================================

  createLeave(
    payload: any
  ): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      payload
    );

  }

}