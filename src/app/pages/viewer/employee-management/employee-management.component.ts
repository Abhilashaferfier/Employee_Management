import {
  Component,
  OnInit
} from '@angular/core';

import {
  HttpErrorResponse
} from '@angular/common/http';

import {
  EmployeeManagementService
} from '../../../services/employee-management.service';


// =====================================================
// EMPLOYEE INTERFACE
// =====================================================

export interface Employee {

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
    'app-employee-management',

  templateUrl:
    './employee-management.component.html',

  styleUrls:
    ['./employee-management.component.css']

})
export class EmployeeManagementComponent
  implements OnInit {


  // =====================================================
  // EMPLOYEES
  // =====================================================

  employees: Employee[] = [];


  // =====================================================
  // SEARCH
  // =====================================================

  searchText = '';


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
    private employeeService:
      EmployeeManagementService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadEmployees();

  }


  // =====================================================
  // GET ALL EMPLOYEES
  // =====================================================

  loadEmployees(): void {

    this.loadingEmployees = true;

    this.errorMessage = '';


    this.employeeService
      .getAllEmployees()
      .subscribe({


        // =================================================
        // SUCCESS
        // =================================================

        next: (
          response: Employee[]
        ) => {

          console.log(
            'ALL EMPLOYEES:',
            response
          );


          // -----------------------------------------------
          // STORE EMPLOYEES
          // -----------------------------------------------

          this.employees =
            (response || []).map(
              employee => ({

                id:
                  employee.id,

                email:
                  employee.email,

                firstName:
                  employee.firstName,

                lastName:
                  employee.lastName,

                departmentName:
                  employee.departmentName,

                designation:
                  employee.designation,

                dateOfJoining:
                  employee.dateOfJoining,

                reportingManagerEmail:
                  employee.reportingManagerEmail,

                status:
                  employee.status

              })
            );


          // -----------------------------------------------
          // LOADING COMPLETE
          // -----------------------------------------------

          this.loadingEmployees =
            false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'GET EMPLOYEES ERROR:',
            error
          );


          // -----------------------------------------------
          // CLEAR DATA
          // -----------------------------------------------

          this.employees = [];


          // -----------------------------------------------
          // ERROR MESSAGE
          // -----------------------------------------------

          this.errorMessage =

            error?.error?.responseMessage ||

            error?.error?.message ||

            error?.message ||

            'Unable to load employees.';


          // -----------------------------------------------
          // LOADING COMPLETE
          // -----------------------------------------------

          this.loadingEmployees =
            false;

        }

      });

  }


  // =====================================================
  // FILTER EMPLOYEES
  // =====================================================

  get filteredEmployees(): Employee[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    // ===================================================
    // NO SEARCH
    // ===================================================

    if (!search) {

      return this.employees;

    }


    // ===================================================
    // SEARCH EMPLOYEES
    // ===================================================

    return this.employees.filter(
      employee => {

        const name =
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase();


        return (

          // NAME

          name.includes(search)


          ||


          // EMAIL

          employee.email
            .toLowerCase()
            .includes(search)


          ||


          // DESIGNATION

          (
            employee.designation || ''
          )
            .toLowerCase()
            .includes(search)


          ||


          // DEPARTMENT

          (
            employee.departmentName || ''
          )
            .toLowerCase()
            .includes(search)


          ||


          // REPORTING MANAGER

          (
            employee.reportingManagerEmail || ''
          )
            .toLowerCase()
            .includes(search)


          ||


          // STATUS

          (
            employee.status || ''
          )
            .toLowerCase()
            .includes(search)

        );

      }
    );

  }

}