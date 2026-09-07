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



@Injectable({
  providedIn: 'root'
})
export class LeaveApprovalService {




  private readonly apiUrl =
    `${environment.apiUrl}/leaves`;



  constructor(
    private http: HttpClient
  ) {}


  
  getPendingLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/team/pending`
    );

  }


  
  rejectLeave(
    leaveId: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/reject`,
      {}
    );

  }


  

  approveLeave(
    leaveId: string
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${leaveId}/approve`,
      {}
    );

  }


  
  getAllLeaves(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/admin`
    );

  }

}