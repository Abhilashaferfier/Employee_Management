import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// ==========================================
// EMPLOYEE PROFILE RESPONSE
// ==========================================

export interface EmployeeProfile {

  id: string;

  userId: string;

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


// ==========================================
// EMPLOYEE SERVICE
// ==========================================

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    'http://localhost:8081/api/v1/employees';


  constructor(
    private http: HttpClient
  ) {}


  // ==========================================
  // GET EMPLOYEE BY USER ID
  // ==========================================

  getEmployeeByUserId(
    userId: string
  ): Observable<EmployeeProfile> {

    return this.http.get<EmployeeProfile>(
      `${this.apiUrl}/${userId}`
    );

  }

}