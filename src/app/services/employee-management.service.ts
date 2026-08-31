import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';
import { environment } from '../../environments/environment.development';


// =====================================================
// EMPLOYEE RESPONSE INTERFACE
// =====================================================

export interface Employee {

  id: string;

  userId: string | null;

  email: string;

  employeeCode: string | null;

  firstName: string;

  lastName: string;

  phone: string | null;

  departmentId: string | null;

  departmentName: string | null;

  designation: string | null;

  dateOfJoining: string | null;

  reportingManagerId: string | null;

  reportingManagerName: string | null;

  status: string;

}


// =====================================================
// SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {


  // =====================================================
  // BASE API URL
  // =====================================================

  private readonly apiUrl =
      `${environment.apiUrl}/employees`;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET ALL EMPLOYEES
  // =====================================================

  getAllEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl
    );

  }


  // =====================================================
  // UPDATE EMPLOYEE
  // PATCH
  // =====================================================

  updateEmployee(
    email: string,
    payload: any
  ): Observable<Employee> {

    const params =
      new HttpParams()
        .set('email', email);


    return this.http.patch<Employee>(
      this.apiUrl,
      payload,
      {
        params
      }
    );

  }

}