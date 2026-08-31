import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


// =====================================================
// EMPLOYEE RESPONSE
// =====================================================

export interface DashboardEmployee {

  id: string;

  userId: string | null;

  email: string;

  employeeCode: string | null;

  firstName: string;

  lastName: string;

  status: string;

}


// =====================================================
// DASHBOARD SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  // =====================================================
  // BASE API URL
  // =====================================================

  private readonly apiUrl =
    environment.apiUrl;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET ALL EMPLOYEES
  // =====================================================

  getAllEmployees(): Observable<DashboardEmployee[]> {

    return this.http.get<DashboardEmployee[]>(
      `${this.apiUrl}/employees`
    );

  }


  // =====================================================
  // FUTURE DASHBOARD APIs
  // =====================================================

  /*
   * Jab Present Today API milegi:
   *
   * getPresentToday(): Observable<number> {
   *
   *   return this.http.get<number>(
   *     `${this.apiUrl}/attendance/present-today`
   *   );
   *
   * }
   */


  /*
   * Jab Pending Leaves API milegi:
   *
   * getPendingLeaves(): Observable<number> {
   *
   *   return this.http.get<number>(
   *     `${this.apiUrl}/leave/pending-count`
   *   );
   *
   * }
   */


  /*
   * Jab Payroll API milegi:
   *
   * getPendingPayroll(): Observable<number> {
   *
   *   return this.http.get<number>(
   *     `${this.apiUrl}/payroll/pending-count`
   *   );
   *
   * }
   */

}