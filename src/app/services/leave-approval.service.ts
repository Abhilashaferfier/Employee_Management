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
// LEAVE RESPONSE INTERFACE
// =====================================================

export interface LeaveApprovalResponse {

  id: string;

  name: string;

  email: string;

  requestedTo: string;

  leaveType: string;

  from: string;

  to: string;

  reason: string;

  status: string;

}


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
  // GET TEAM PENDING LEAVES
  // =====================================================

  getPendingLeaves():
    Observable<LeaveApprovalResponse[]> {

    return this.http.get<LeaveApprovalResponse[]>(
      `${this.apiUrl}/team/pending`
    );

  }


  // =====================================================
  // REJECT LEAVE
  // =====================================================

  rejectLeave(
    leaveId: string
  ): Observable<LeaveApprovalResponse> {

    return this.http.patch<LeaveApprovalResponse>(
      `${this.apiUrl}/${leaveId}/reject`,
      {}
    );

  }


  // =====================================================
  // APPROVE LEAVE
  // =====================================================
  //
  // IMPORTANT:
  // Backend API documentation says:
  //
  // PATCH /leaves/{user_id}/approve
  //
  // But GET /team/pending response does NOT contain user_id.
  //
  // So don't call this method until backend confirms
  // which ID should be passed here.
  //
  // =====================================================

  approveLeave(
    leaveId: string
  ): Observable<LeaveApprovalResponse> {

    return this.http.patch<LeaveApprovalResponse>(
      `${this.apiUrl}/${leaveId}/approve`,
      {}
    );

  }

}