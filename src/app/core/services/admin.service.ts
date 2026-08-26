import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  private readonly apiUrl =
    'http://localhost:8081/api/v1/admin';


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