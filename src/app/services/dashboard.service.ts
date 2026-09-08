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
export class DashboardService {


  // ===================================================
  // BASE API URL
  // ===================================================

  private readonly apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) {}


  // ===================================================
  // GET ALL EMPLOYEES
  // ===================================================

  getAllEmployees():
    Observable<DashboardEmployee[]> {

    return this.http.get<
      DashboardEmployee[]
    >(
      `${this.apiUrl}/employees`
    );

  }


  // ===================================================
  // GET ALL LEAVES
  // ===================================================

  getAllLeaves():
    Observable<DashboardLeave[]> {

    return this.http.get<
      DashboardLeave[]
    >(
      `${this.apiUrl}/leaves/admin`
    );

  }

}