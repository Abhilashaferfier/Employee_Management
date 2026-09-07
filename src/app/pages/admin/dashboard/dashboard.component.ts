import {
  Component,
  OnInit
} from '@angular/core';

import {
  DashboardService,
  DashboardEmployee,
  DashboardLeave
} from '../../../services/dashboard.service';


// =====================================================
// DASHBOARD COMPONENT
// =====================================================

@Component({

  selector:
    'app-admin-dashboard',

  templateUrl:
    './dashboard.component.html',

  styleUrls:
    ['./dashboard.component.css']

})
export class DashboardComponent
  implements OnInit {


  // =====================================================
  // LOGGED IN USER NAME
  // =====================================================

  loggedInUserName = 'User';


  // =====================================================
  // EMPLOYEES
  // =====================================================

  employees:
    DashboardEmployee[] = [];


  // =====================================================
  // LEAVES
  // =====================================================

  leaves:
    DashboardLeave[] = [];


  // =====================================================
  // TOTAL EMPLOYEES
  // =====================================================

  totalEmployees = 0;


  // =====================================================
  // PRESENT TODAY
  // =====================================================

  presentToday:
    number | null = null;


  // =====================================================
  // PENDING LEAVES
  // =====================================================

  pendingLeaves:
    number | null = null;


  // =====================================================
  // PENDING PAYROLL
  // =====================================================

  pendingPayroll:
    number | null = null;


  // =====================================================
  // EMPLOYEE LOADING
  // =====================================================

  loadingEmployees = false;


  // =====================================================
  // LEAVE LOADING
  // =====================================================

  loadingLeaves = false;


  // =====================================================
  // EMPLOYEE ERROR
  // =====================================================

  errorMessage = '';


  // =====================================================
  // LEAVE ERROR
  // =====================================================

  leaveErrorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private dashboardService:
      DashboardService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.getLoggedInUserName();

    this.loadDashboardData();

  }


  // =====================================================
  // GET LOGGED IN USER NAME
  // =====================================================

  getLoggedInUserName(): void {

    const firstName =
      localStorage.getItem(
        'firstName'
      );


    const lastName =
      localStorage.getItem(
        'lastName'
      );


    // DEFAULT

    this.loggedInUserName =
      'User';


    // FIRST NAME

    if (firstName) {

      this.loggedInUserName =
        firstName;

    }


    // FULL NAME

    if (
      firstName &&
      lastName
    ) {

      this.loggedInUserName =
        `${firstName} ${lastName}`;

    }

  }


  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  loadDashboardData(): void {

    this.loadEmployees();

    this.loadLeaves();

  }


  // =====================================================
  // LOAD EMPLOYEES
  // =====================================================

  loadEmployees(): void {

    this.loadingEmployees = true;

    this.errorMessage = '';


    this.dashboardService
      .getAllEmployees()
      .subscribe({


        // =================================================
        // SUCCESS
        // =================================================

        next: (
          response:
            DashboardEmployee[]
        ) => {

          console.log(
            'DASHBOARD EMPLOYEES:',
            response
          );


          // STORE EMPLOYEES

          this.employees =
            response || [];


          // TOTAL EMPLOYEES

          this.totalEmployees =
            this.employees.length;


          // LOADING COMPLETE

          this.loadingEmployees =
            false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error
        ) => {

          console.error(
            'DASHBOARD EMPLOYEES ERROR:',
            error
          );


          this.employees = [];

          this.totalEmployees = 0;


          this.errorMessage =

            error?.error?.message ||

            error?.error?.responseMessage ||

            'Unable to load employees.';


          this.loadingEmployees =
            false;

        }

      });

  }


  // =====================================================
  // LOAD LEAVES
  // =====================================================

  loadLeaves(): void {

    this.loadingLeaves = true;

    this.leaveErrorMessage = '';


    this.dashboardService
      .getAllLeaves()
      .subscribe({


        // =================================================
        // SUCCESS
        // =================================================

        next: (
          response:
            DashboardLeave[]
        ) => {

          console.log(
            'DASHBOARD LEAVES:',
            response
          );


          // STORE LEAVES

          this.leaves =
            response || [];


          // ===============================================
          // COUNT PENDING LEAVES
          // ===============================================

          this.pendingLeaves =
            this.leaves.filter(

              leave =>
                leave.status?.toUpperCase() ===
                'PENDING'

            ).length;


          // LOADING COMPLETE

          this.loadingLeaves =
            false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error
        ) => {

          console.error(
            'DASHBOARD LEAVES ERROR:',
            error
          );


          // CLEAR LEAVES

          this.leaves = [];


          // RESET PENDING LEAVES

          this.pendingLeaves = 0;


          // ERROR MESSAGE

          this.leaveErrorMessage =

            error?.error?.message ||

            error?.error?.responseMessage ||

            'Unable to load leave requests.';


          // LOADING COMPLETE

          this.loadingLeaves =
            false;

        }

      });

  }


  // =====================================================
  // RECENT EMPLOYEES
  // =====================================================

  get recentEmployees():
    DashboardEmployee[] {

    return this.employees;

  }


  // =====================================================
  // GET EMPLOYEE NAME
  // =====================================================

  getEmployeeName(
    leave:
      DashboardLeave
  ): string {

    // IF API DIRECTLY SENDS EMPLOYEE NAME

    if (leave.employeeName) {

      return leave.employeeName;

    }


    // IF API SENDS FIRST + LAST NAME

    const firstName =
      leave.firstName || '';

    const lastName =
      leave.lastName || '';


    const fullName =
      `${firstName} ${lastName}`
        .trim();


    return fullName || '-';

  }

}