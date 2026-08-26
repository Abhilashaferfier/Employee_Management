import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  EmployeeService,
  EmployeeProfile
} from '../../../core/services/employee.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  // ==========================================
  // EMPLOYEE DATA
  // ==========================================

  employee: EmployeeProfile | null = null;


  // ==========================================
  // LOADING
  // ==========================================

  loading = false;


  // ==========================================
  // ERROR MESSAGE
  // ==========================================

  errorMessage = '';


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private employeeService: EmployeeService
  ) {}


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.loadProfile();

  }


  // ==========================================
  // LOAD PROFILE
  // ==========================================

  loadProfile(): void {

    this.loading = true;

    this.errorMessage = '';


    // ========================================
    // GET USER ID FROM LOCAL STORAGE
    // ========================================

    const userId =
      localStorage.getItem('userId');


    console.log(
      'Logged in User ID:',
      userId
    );


    // ========================================
    // USER ID NOT FOUND
    // ========================================

    if (!userId) {

      this.loading = false;

      this.errorMessage =
        'User ID not found. Please login again.';

      console.error(
        'User ID not found in localStorage'
      );

      return;

    }


    // ========================================
    // API CALL
    // ========================================

    this.employeeService
      .getEmployeeByUserId(userId)
      .subscribe({

        // ====================================
        // SUCCESS
        // ====================================

        next: (
          response: EmployeeProfile
        ) => {

          console.log(
            'PROFILE RESPONSE:',
            response
          );


          this.employee =
            response;


          this.loading = false;

        },


        // ====================================
        // ERROR
        // ====================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'PROFILE API ERROR:',
            error
          );


          this.loading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load profile.';

        }

      });

  }


  // ==========================================
  // FULL NAME
  // ==========================================

  get fullName(): string {

    if (!this.employee) {

      return '';

    }


    return `${this.employee.firstName} ${this.employee.lastName}`;

  }


  // ==========================================
  // EDIT PROFILE
  // ==========================================

  editProfile(): void {

    console.log(
      'Edit profile clicked'
    );

  }

}