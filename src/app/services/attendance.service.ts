import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';



export interface AttendanceRecord {

  employeeId: string;

  employee: string;

  checkIn: string | null;

  checkOut: string | null;

  status: string;

}




export interface AttendanceSummary {

  present: number;

  absent: number;

  late: number;

}



export interface AttendanceResponse {

  date: string;

  summary: AttendanceSummary;

  records: AttendanceRecord[];

}



@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  
  private readonly apiUrl =
    `${environment.apiUrl}/admin/attendance`;


  constructor(
    private http: HttpClient
  ) {}


  

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