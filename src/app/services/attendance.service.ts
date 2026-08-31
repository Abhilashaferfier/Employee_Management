import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


// =====================================================
// ATTENDANCE RECORD
// =====================================================

export interface AttendanceRecord {

  employeeId: string;

  employee: string;

  checkIn: string | null;

  checkOut: string | null;

  status: string;

}


// =====================================================
// ATTENDANCE SUMMARY
// =====================================================

export interface AttendanceSummary {

  present: number;

  absent: number;

  late: number;

}


// =====================================================
// ATTENDANCE RESPONSE
// =====================================================

export interface AttendanceResponse {

  date: string;

  summary: AttendanceSummary;

  records: AttendanceRecord[];

}


// =====================================================
// SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  // ===================================================
  // BASE API URL
  // ===================================================

  private readonly apiUrl =
    `${environment.apiUrl}/admin/attendance`;


  constructor(
    private http: HttpClient
  ) {}


  // ===================================================
  // GET ATTENDANCE BY DATE
  // ===================================================

  getAttendance(
    date: string
  ): Observable<AttendanceResponse> {

    return this.http.get<AttendanceResponse>(
      this.apiUrl,
      {
        params: {
          date: date
        }
      }
    );

  }

}