import { Injectable } from '@angular/core';

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
// SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class LeaveApprovalService {


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
  // EXISTING API
  // =====================================================

  getPendingLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/team/pending`
    );

  }


  // =====================================================
  // EXISTING API
  // =====================================================

  rejectLeave(
    leaveId: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/reject`,
      {}
    );

  }


  // =====================================================
  // EXISTING API
  // =====================================================

  approveLeave(
    leaveId: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/approve`,
      {}
    );

  }


  // =====================================================
  // NEW ADMIN API
  // =====================================================
  //
  // GET:
  // /api/v1/leaves/admin
  //
  // Ye PENDING + APPROVED + REJECTED
  // sabhi leaves return karegi.
  //
  // =====================================================

  getAllLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/admin`
    );

  }

}