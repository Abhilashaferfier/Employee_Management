import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  EmployeeService
} from '../../../services/profile.service';


// =====================================================
// EMPLOYEE PROFILE INTERFACE
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

  reportingManagerName: string | null;

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
      EmployeeService
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


    // ===================================================
    // GET LOGGED-IN USER EMAIL
    // ===================================================

    const loggedInEmail =
      localStorage.getItem('email');


    console.log(
      'Logged-in Email:',
      loggedInEmail
    );


    // ===================================================
    // EMAIL NOT FOUND
    // ===================================================

    if (!loggedInEmail) {

      this.loading = false;

      this.errorMessage =
        'Logged-in user email not found. Please login again.';

      console.error(
        'Email not found in localStorage.'
      );

      return;

    }


    // ===================================================
    // GET ALL EMPLOYEES FROM API
    // ===================================================

    this.employeeService
      .getAllEmployees()
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: EmployeeProfile[]
        ) => {

          console.log(
            'ALL EMPLOYEES API RESPONSE:',
            response
          );


          // =============================================
          // FIND LOGGED-IN USER
          // =============================================

          const loggedInEmployee =
            response.find(
              employee =>
                employee.email
                  ?.toLowerCase()
                  .trim() ===
                loggedInEmail
                  .toLowerCase()
                  .trim()
            );


          // =============================================
          // USER FOUND
          // =============================================

          if (loggedInEmployee) {

            this.employee =
              loggedInEmployee;

            console.log(
              'LOGGED-IN EMPLOYEE:',
              this.employee
            );

          }


          // =============================================
          // USER NOT FOUND
          // =============================================

          else {

            this.employee = null;

            this.errorMessage =
              'Employee profile not found.';

            console.error(
              'No employee matched logged-in email:',
              loggedInEmail
            );

          }


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


  // =====================================================
  // EDIT PROFILE
  // =====================================================

  // editProfile(): void {

  //   console.log(
  //     'Edit profile clicked'
  //   );

  // }

}