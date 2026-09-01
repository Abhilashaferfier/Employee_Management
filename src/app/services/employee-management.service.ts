import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {

  private readonly apiUrl =
    `${environment.apiUrl}/employees`;


  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET ALL EMPLOYEES
  // =====================================================

  getAllEmployees(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }


  // =====================================================
  // PATCH EMPLOYEE
  // =====================================================

  updateEmployee(
    email: string,
    payload: any
  ): Observable<any> {

    const params =
      new HttpParams()
        .set('email', email);


    return this.http.patch<any>(
      this.apiUrl,
      payload,
      {
        params
      }
    );

  }

}