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


@Injectable({

  providedIn:
    'root'

})
export class AttendanceManagementService {


  // =====================================================
  // API URL
  // =====================================================

  private apiUrl =
    `${environment.apiUrl}/attendance`;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private http:
      HttpClient
  ) {}


  // =====================================================
  // GET ALL ATTENDANCE
  // =====================================================

  getAllAttendance():
    Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl
    );

  }


}