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


  
}