import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly apiUrl =
    `${environment.apiUrl}/employees`;

  constructor(
    private http: HttpClient
  ) {}

  // ==========================================
  // GET LOGGED-IN EMPLOYEE PROFILE
  // ==========================================

  getMyProfile(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/me`
    );
  }
}