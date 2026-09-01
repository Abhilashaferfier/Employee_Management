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
// Backend se aane wale sirf wahi fields rakhe hain
// jo frontend me actually required hain.
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

  updateLoading = false;


  // =====================================================
  // ERROR
  // =====================================================

  errorMessage = '';

  updateError = '';


  // =====================================================
  // EDIT MODAL
  // =====================================================

  editModalVisible = false;


  // =====================================================
  // SELECTED EMPLOYEE
  // =====================================================

  selectedEmployee:
    Employee | null = null;


  // =====================================================
  // DEPARTMENT OPTIONS
  // =====================================================
  // Ye frontend se aa rahe hain.
  // Iske liye backend API nahi hai.
  // =====================================================

  departments: string[] = [

    'IT',

    'HR',

    'Finance',

    'Sales',

    'Marketing',

    'Design',

    'Development'

  ];


  // =====================================================
  // FILTERED DEPARTMENTS
  // =====================================================

  filteredDepartments: string[] = [

    ...this.departments

  ];


  // =====================================================
  // DESIGNATION OPTIONS
  // =====================================================
  // Ye bhi frontend list hai.
  // =====================================================

  designations: string[] = [

    'Software Developer',

    'Senior Software Developer',

    'HR Executive',

    'Accountant',

    'Marketing Executive',

    'UI Designer',

    'Project Manager',

    'Team Lead',

    'Software Engineer',

    'Senior Software Engineer'

  ];


  // =====================================================
  // FILTERED DESIGNATIONS
  // =====================================================

  filteredDesignations: string[] = [

    ...this.designations

  ];


  // =====================================================
  // REPORTING MANAGER EMAIL LIST
  // =====================================================
  // Employees API se emails nikali jayengi.
  // =====================================================

  reportingManagerEmails: string[] = [];


  // =====================================================
  // FILTERED REPORTING MANAGER EMAILS
  // =====================================================

  filteredReportingManagers: string[] = [];


  // =====================================================
  // EDIT FORM
  // =====================================================

  editForm = {

    firstName: '',

    lastName: '',

    email: '',

    designation: '',

    departmentName: '',

    dateOfJoining: '',

    reportingManagerEmail: '',

    status: ''

  };


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
          // CREATE REPORTING MANAGER EMAIL LIST
          // -----------------------------------------------

          this.reportingManagerEmails =
            this.employees

              .map(
                employee =>
                  employee.email
              )

              .filter(
                (
                  email
                ): email is string =>
                  !!email
              );


          // -----------------------------------------------
          // REMOVE DUPLICATE EMAILS
          // -----------------------------------------------

          this.reportingManagerEmails =
            [
              ...new Set(
                this.reportingManagerEmails
              )
            ];


          // -----------------------------------------------
          // INITIAL REPORTING MANAGER OPTIONS
          // -----------------------------------------------

          this.filteredReportingManagers =
            [
              ...this.reportingManagerEmails
            ];


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

          this.reportingManagerEmails = [];

          this.filteredReportingManagers = [];


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
  // SEARCH DEPARTMENTS
  // =====================================================

  searchDepartments(
    event: any
  ): void {

    const query =
      (
        event?.query || ''
      )
        .toLowerCase()
        .trim();


    // -----------------------------------------------
    // SHOW ALL
    // -----------------------------------------------

    if (!query) {

      this.filteredDepartments =
        [
          ...this.departments
        ];

      return;

    }


    // -----------------------------------------------
    // SEARCH
    // -----------------------------------------------

    this.filteredDepartments =
      this.departments.filter(
        department =>
          department
            .toLowerCase()
            .includes(query)
      );

  }


  // =====================================================
  // SEARCH DESIGNATIONS
  // =====================================================

  searchDesignations(
    event: any
  ): void {

    const query =
      (
        event?.query || ''
      )
        .toLowerCase()
        .trim();


    // -----------------------------------------------
    // SHOW ALL
    // -----------------------------------------------

    if (!query) {

      this.filteredDesignations =
        [
          ...this.designations
        ];

      return;

    }


    // -----------------------------------------------
    // SEARCH
    // -----------------------------------------------

    this.filteredDesignations =
      this.designations.filter(
        designation =>
          designation
            .toLowerCase()
            .includes(query)
      );

  }


  // =====================================================
  // SEARCH REPORTING MANAGERS
  // =====================================================

  searchReportingManagers(
    event: any
  ): void {

    const query =
      (
        event?.query || ''
      )
        .toLowerCase()
        .trim();


    // -----------------------------------------------
    // SHOW ALL EMAILS
    // -----------------------------------------------

    if (!query) {

      this.filteredReportingManagers =
        [
          ...this.reportingManagerEmails
        ];

      return;

    }


    // -----------------------------------------------
    // SEARCH EMAIL
    // -----------------------------------------------

    this.filteredReportingManagers =
      this.reportingManagerEmails.filter(
        email =>
          email
            .toLowerCase()
            .includes(query)
      );

  }


  // =====================================================
  // EDIT EMPLOYEE
  // =====================================================

  editEmployee(
    employee: Employee
  ): void {

    console.log(
      'EDIT EMPLOYEE:',
      employee
    );


    // -----------------------------------------------
    // SAVE SELECTED EMPLOYEE
    // -----------------------------------------------

    this.selectedEmployee =
      employee;


    // -----------------------------------------------
    // PREFILL EDIT FORM
    // -----------------------------------------------

    this.editForm = {

      firstName:
        employee.firstName || '',

      lastName:
        employee.lastName || '',

      email:
        employee.email || '',

      designation:
        employee.designation || '',

      departmentName:
        employee.departmentName || '',

      dateOfJoining:
        employee.dateOfJoining || '',

      reportingManagerEmail:
        employee.reportingManagerEmail || '',

      status:
        employee.status || 'ACTIVE'

    };


    // -----------------------------------------------
    // RESET ERROR
    // -----------------------------------------------

    this.updateError = '';


    // -----------------------------------------------
    // OPEN MODAL
    // -----------------------------------------------

    this.editModalVisible =
      true;

  }


  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  closeEditModal(): void {

    // -----------------------------------------------
    // DO NOT CLOSE DURING UPDATE
    // -----------------------------------------------

    if (this.updateLoading) {

      return;

    }


    this.editModalVisible =
      false;


    this.selectedEmployee =
      null;


    this.updateError =
      '';

  }


  // =====================================================
  // UPDATE EMPLOYEE
  // =====================================================

  updateEmployee(): void {

    // -----------------------------------------------
    // CHECK SELECTED EMPLOYEE
    // -----------------------------------------------

    if (!this.selectedEmployee) {

      return;

    }


    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (

      !this.editForm.firstName
        .trim() ||

      !this.editForm.lastName
        .trim() ||

      !this.editForm.email
        .trim()

    ) {

      this.updateError =
        'First name, last name and email are required.';

      return;

    }


    // -----------------------------------------------
    // START LOADING
    // -----------------------------------------------

    this.updateLoading =
      true;

    this.updateError =
      '';


    // =================================================
    // PATCH PAYLOAD
    // =================================================

    const payload = {

      firstName:
        this.editForm.firstName
          .trim(),

      lastName:
        this.editForm.lastName
          .trim(),

      email:
        this.editForm.email
          .trim(),

      designation:
        this.editForm.designation ||
        null,

      departmentName:
        this.editForm.departmentName ||
        null,

      dateOfJoining:
        this.editForm.dateOfJoining ||
        null,

      reportingManagerEmail:
        this.editForm.reportingManagerEmail ||
        null,

      status:
        this.editForm.status ||
        'ACTIVE'

    };


    console.log(
      'PATCH PAYLOAD:',
      payload
    );


    // =================================================
    // PATCH API
    // =================================================

    this.employeeService
      .updateEmployee(

        this.selectedEmployee.email,

        payload

      )
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: Employee
        ) => {

          console.log(
            'EMPLOYEE UPDATED:',
            response
          );


          // -------------------------------------------
          // UPDATE LOCAL EMPLOYEE
          // -------------------------------------------

          const index =
            this.employees.findIndex(
              employee =>
                employee.id ===
                response.id
            );


          if (index !== -1) {

            this.employees[index] =
              response;

          }


          // -------------------------------------------
          // CLOSE MODAL
          // -------------------------------------------

          this.updateLoading =
            false;

          this.editModalVisible =
            false;

          this.selectedEmployee =
            null;


          // -------------------------------------------
          // RELOAD FROM API
          // -------------------------------------------

          this.loadEmployees();

        },


        // =============================================
        // ERROR
        // =============================================

        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'PATCH EMPLOYEE ERROR:',
            error
          );


          this.updateError =
            error?.error?.responseMessage ||

            error?.error?.message ||

            error?.message ||

            'Unable to update employee.';


          this.updateLoading =
            false;

        }

      });

  }


  // =====================================================
  // DELETE EMPLOYEE
  // =====================================================

  deleteEmployee(
    employee: Employee
  ): void {

    console.log(
      'DELETE EMPLOYEE:',
      employee
    );


    /*
     * Delete API abhi available nahi hai.
     */

  }


  // =====================================================
  // FILTER EMPLOYEES
  // =====================================================

  get filteredEmployees(): Employee[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    // -----------------------------------------------
    // NO SEARCH
    // -----------------------------------------------

    if (!search) {

      return this.employees;

    }


    // -----------------------------------------------
    // SEARCH EMPLOYEES
    // -----------------------------------------------

    return this.employees.filter(
      employee => {

        const name =
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase();


        return (

          name.includes(search)

          ||

          employee.email
            .toLowerCase()
            .includes(search)

          ||

          (
            employee.designation || ''
          )
            .toLowerCase()
            .includes(search)

          ||

          (
            employee.departmentName || ''
          )
            .toLowerCase()
            .includes(search)

          ||

          (
            employee.reportingManagerEmail || ''
          )
            .toLowerCase()
            .includes(search)

        );

      }
    );

  }

}