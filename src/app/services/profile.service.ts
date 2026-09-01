import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment';


// =====================================================
// EMPLOYEE SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  // =====================================================
  // BASE API URL
  // =====================================================

  private readonly apiUrl =
    `${environment.apiUrl}/employees`;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

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

}