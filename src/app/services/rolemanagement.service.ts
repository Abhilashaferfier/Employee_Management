import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


// =====================================================
// USER RESPONSE
// =====================================================

export interface AdminUser {

  userId: string;

  email: string;

  isAdmin: boolean;

  isEmployee: boolean;

  status: string;

  message: string | null;

}


// =====================================================
// ACCESS REQUEST
// =====================================================

export interface UserAccessRequest {

  isAdmin: boolean;

  isEmployee: boolean;

}


// =====================================================
// ACCESS RESPONSE
// =====================================================

export interface UserAccessResponse {

  userId: string;

  email: string;

  isAdmin: boolean;

  isEmployee: boolean;

  status: string;

  message: string | null;

}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // =====================================================
  // BASE API URL
  // =====================================================

  private readonly apiUrl =
    `${environment.apiUrl}/admin`;


  constructor(
    private http: HttpClient
  ) {}


  // =====================================================
  // GET ALL USERS
  // =====================================================

  getAllUsers(): Observable<AdminUser[]> {

    return this.http.get<AdminUser[]>(
      `${this.apiUrl}/users`
    );

  }


  // =====================================================
  // UPDATE USER ACCESS
  // =====================================================

  updateUserAccess(
    email: string,
    access: UserAccessRequest
  ): Observable<UserAccessResponse> {

    return this.http.patch<UserAccessResponse>(
      `${this.apiUrl}/users/access`,
      access,
      {
        params: {
          email: email
        }
      }
    );

  }

}