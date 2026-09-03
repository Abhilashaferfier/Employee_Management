import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // ==========================================
  // EMPLOYEE API
  // ==========================================

  private readonly apiUrl =
    `${environment.apiUrl}/employees`;


  // ==========================================
  // AUTH API
  // ==========================================

  private readonly authApiUrl =
    `${environment.apiUrl}/auth`;


  constructor(
    private http: HttpClient
  ) {}


  // ==========================================
  // GET ALL USERS / EMPLOYEES
  // ==========================================

  getAllUsers(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }


  // ==========================================
  // ADD USER
  // ==========================================

  addUser(user: any): Observable<any> {

    return this.http.post<any>(
      `${this.authApiUrl}/register`,
      user
    );

  }

}