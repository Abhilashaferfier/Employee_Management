import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment';


// ======================================================
// SIGNUP REQUEST
// ======================================================

export interface SignupRequest {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

}


// ======================================================
// SIGNUP RESPONSE
// ======================================================

export interface SignupResponse {

  admin: boolean;

  email: string;

  employee: boolean;

  message: string;

  status: string;

  userId: string;

}


// ======================================================
// LOGIN REQUEST
// ======================================================

export interface LoginRequest {

  email: string;

  password: string;

}


// ======================================================
// LOGIN RESPONSE
// ======================================================

export interface LoginResponse {

  admin: boolean;

  email: string;

  employee: boolean;

  token: string;

  tokenType: string;

  userId: string;

  firstName?: string;

  lastName?: string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // ======================================================
  // BASE API URL
  // ======================================================

  private readonly apiUrl =
    `${environment.apiUrl}/auth`;


  constructor(
    private http: HttpClient
  ) {}


  // ======================================================
  // SIGNUP
  // ======================================================

  signup(
    data: SignupRequest
  ): Observable<SignupResponse> {

    return this.http.post<SignupResponse>(
      `${this.apiUrl}/register`,
      data
    );

  }


  // ======================================================
  // LOGIN
  // ======================================================

  login(
    data: LoginRequest
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data
    );

  }


  // ======================================================
  // LOGOUT
  // ======================================================

  logout(): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/logout`,
      {}
    );

  }

}