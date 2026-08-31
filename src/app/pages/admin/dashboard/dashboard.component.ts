import {
  Component,
  OnInit
} from '@angular/core';

import {
  DashboardService,
  DashboardEmployee
} from '../../../services/dashboard.service';


// =====================================================
// DASHBOARD COMPONENT
// =====================================================

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  // =====================================================
  // ALL EMPLOYEES
  // =====================================================

  employees: DashboardEmployee[] = [];


  // =====================================================
  // TOTAL EMPLOYEES
  // =====================================================

  totalEmployees = 0;


  // =====================================================
  // PRESENT TODAY
  // =====================================================

  presentToday: number | null = null;


  // =====================================================
  // PENDING LEAVES
  // =====================================================

  pendingLeaves: number | null = null;


  // =====================================================
  // PENDING PAYROLL
  // =====================================================

  pendingPayroll: number | null = null;


  // =====================================================
  // LOADING
  // =====================================================

  loadingEmployees = false;


  // =====================================================
  // ERROR
  // =====================================================

  errorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private dashboardService: DashboardService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadDashboardData();

  }


  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  loadDashboardData(): void {

    this.loadEmployees();

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

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: DashboardEmployee[]
        ) => {

          console.log(
            'DASHBOARD EMPLOYEES:',
            response
          );


          // ---------------------------------------------
          // STORE EMPLOYEES
          // ---------------------------------------------

          this.employees =
            response || [];


          // ---------------------------------------------
          // TOTAL EMPLOYEES
          // ---------------------------------------------

          this.totalEmployees =
            this.employees.length;


          // ---------------------------------------------
          // LOADING COMPLETE
          // ---------------------------------------------

          this.loadingEmployees = false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (error) => {

          console.error(
            'DASHBOARD EMPLOYEES ERROR:',
            error
          );


          // ---------------------------------------------
          // CLEAR DATA
          // ---------------------------------------------

          this.employees = [];

          this.totalEmployees = 0;


          // ---------------------------------------------
          // ERROR MESSAGE
          // ---------------------------------------------

          this.errorMessage =
            error?.error?.message ||
            error?.error?.responseMessage ||
            'Unable to load employees.';


          // ---------------------------------------------
          // LOADING COMPLETE
          // ---------------------------------------------

          this.loadingEmployees = false;

        }

      });

  }


  // =====================================================
  // RECENT EMPLOYEES
  // =====================================================

  get recentEmployees(): DashboardEmployee[] {

    return this.employees.slice(0, 5);

  }

}