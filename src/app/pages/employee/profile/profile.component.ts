import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  ProfileService,
} from '../../../services/profile.service';


// =====================================================
// FRONTEND PROFILE INTERFACE
// Only fields required by UI
// =====================================================

export interface EmployeeProfile {

  id: string;

  email: string;

  firstName: string;

  lastName: string;

  departmentName: string | null;

  designation: string | null;

  dateOfJoining: string | null;

  reportingManagerEmail: string | null;

  status: string;

}


// =====================================================
// COMPONENT
// =====================================================

@Component({

  selector:
    'app-profile',

  templateUrl:
    './profile.component.html',

  styleUrls:
    ['./profile.component.css']

})
export class ProfileComponent
  implements OnInit {


  // =====================================================
  // EMPLOYEE
  // =====================================================

  employee:
    EmployeeProfile | null = null;


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;


  // =====================================================
  // ERROR
  // =====================================================

  errorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private employeeService:
      ProfileService
  ) {}


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {

    this.loadProfile();

  }


  // =====================================================
  // LOAD LOGGED-IN USER PROFILE
  // =====================================================

  loadProfile(): void {

    this.loading = true;

    this.errorMessage = '';

    this.employee = null;


    // ===================================================
    // CALL /employees/me API
    // ===================================================

    this.employeeService
      .getMyProfile()
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: any
        ) => {

          console.log(
            'MY PROFILE API RESPONSE:',
            response
          );


          // =============================================
          // MAP ONLY REQUIRED UI FIELDS
          // =============================================

          this.employee = {

            id:
              response.id,

            email:
              response.email,

            firstName:
              response.firstName,

            lastName:
              response.lastName,

            departmentName:
              response.departmentName,

            designation:
              response.designation,

            dateOfJoining:
              response.dateOfJoining,

            reportingManagerEmail:
              response.reportingManagerEmail,

            status:
              response.status

          };


          console.log(
            'LOGGED-IN EMPLOYEE PROFILE:',
            this.employee
          );


          this.loading = false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'PROFILE API ERROR:',
            error
          );


          this.employee = null;

          this.loading = false;


          this.errorMessage =
            error?.error?.responseMessage ||

            error?.error?.message ||

            'Unable to load profile.';

        }

      });

  }


  // =====================================================
  // FULL NAME
  // =====================================================

  get fullName(): string {

    if (!this.employee) {

      return '';

    }


    return `${this.employee.firstName} ${this.employee.lastName}`;

  }

}