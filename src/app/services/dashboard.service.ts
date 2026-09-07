import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


// =====================================================
// EMPLOYEE INTERFACE
// =====================================================

export interface DashboardEmployee {

  firstName: string;

  lastName: string;

  email: string;

  status: string;

}


// =====================================================
// LEAVE INTERFACE
// =====================================================

export interface DashboardLeave {

  employeeName?: string;

  firstName?: string;

  lastName?: string;

  leaveType: string;

  status: string;

}


// =====================================================
// SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  // =====================================================
  // EMPLOYEE API URL
  // =====================================================

  private employeeApiUrl =
    'http://localhost:8081/api/v1/employees';


  // =====================================================
  // LEAVE API URL
  // =====================================================

  private leaveApiUrl =
    'http://localhost:8081/api/v1/leaves';


  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET ALL EMPLOYEES
  // =====================================================

  getAllEmployees():
    Observable<DashboardEmployee[]> {

    return this.http.get<
      DashboardEmployee[]
    >(
      this.employeeApiUrl
    );

  }


  // =====================================================
  // GET ALL LEAVES
  // =====================================================

  getAllLeaves():
    Observable<DashboardLeave[]> {

    return this.http.get<
      DashboardLeave[]
    >(
      `${this.leaveApiUrl}/admin`
    );

  }

}