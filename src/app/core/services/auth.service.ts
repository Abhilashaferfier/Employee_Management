
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

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  signup(
    data: SignupRequest
  ): Observable<SignupResponse> {

    return this.http.post<SignupResponse>(
      `${this.apiUrl}/signup`,
      data
    );
  }

  login(
    data: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }

}