import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface SignupResponse {
  message: string;
  user: User;
}

/*
 * Backend ka actual login response
 *
 * {
 *   email: "...",
 *   role: "EMPLOYEE",
 *   token: "...",
 *   tokenType: "Bearer",
 *   userId: "..."
 * }
 */
export interface LoginResponse {
  email: string;
  role: string;
  token: string;
  tokenType: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:8081/api/v1/auth';

  constructor(
    private http: HttpClient
  ) {}

  // ==============================
  // REGISTER
  // ==============================

  signup(
    data: SignupRequest
  ): Observable<SignupResponse> {

    return this.http.post<SignupResponse>(
      `${this.apiUrl}/register`,
      data
    );

  }

  // ==============================
  // LOGIN
  // ==============================

  login(
    data: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data
    );

  }

}