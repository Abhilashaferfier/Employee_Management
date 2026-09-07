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
  // PAGINATION
  // =====================================================

  currentPage = 1;

  itemsPerPage = 8;


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
  // DEPARTMENTS
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
  // DESIGNATIONS
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
  // REPORTING MANAGERS
  // =====================================================

  reportingManagerEmails: string[] = [];


  // =====================================================
  // FILTERED REPORTING MANAGERS
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

        next: (
          response: Employee[]
        ) => {

          console.log(
            'ALL EMPLOYEES:',
            response
          );


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


          // =================================================
          // RESET PAGINATION
          // =================================================

          this.currentPage = 1;


          // =================================================
          // CREATE REPORTING MANAGER LIST
          // =================================================

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


          // =================================================
          // REMOVE DUPLICATES
          // =================================================

          this.reportingManagerEmails =
            [
              ...new Set(
                this.reportingManagerEmails
              )
            ];


          // =================================================
          // SET FILTERED MANAGERS
          // =================================================

          this.filteredReportingManagers =
            [
              ...this.reportingManagerEmails
            ];


          this.loadingEmployees =
            false;

        },


        error: (
          error: HttpErrorResponse
        ) => {

          console.error(
            'GET EMPLOYEES ERROR:',
            error
          );


          this.employees = [];

          this.reportingManagerEmails = [];

          this.filteredReportingManagers = [];


          this.errorMessage =
            error?.error?.responseMessage ||

            error?.error?.message ||

            error?.message ||

            'Unable to load employees.';


          this.loadingEmployees =
            false;

        }

      });

  }


  // =====================================================
  // SEARCH
  // =====================================================

  onSearch(): void {

    this.currentPage = 1;

  }


  // =====================================================
  // FILTER EMPLOYEES
  // =====================================================

  get filteredEmployees(): Employee[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    if (!search) {

      return this.employees;

    }


    return this.employees.filter(
      employee => {

        const name =
          `${employee.firstName} ${employee.lastName}`
            .toLowerCase();


        return (

          name.includes(search)

          ||

          (employee.email || '')
            .toLowerCase()
            .includes(search)

          ||

          (employee.designation || '')
            .toLowerCase()
            .includes(search)

          ||

          (employee.departmentName || '')
            .toLowerCase()
            .includes(search)

          ||

          (employee.reportingManagerEmail || '')
            .toLowerCase()
            .includes(search)

          ||

          (employee.status || '')
            .toLowerCase()
            .includes(search)

        );

      }
    );

  }


  // =====================================================
  // TOTAL PAGES
  // =====================================================

  get totalPages(): number {

    return Math.max(

      1,

      Math.ceil(
        this.filteredEmployees.length /
        this.itemsPerPage
      )

    );

  }


  // =====================================================
  // PAGINATED EMPLOYEES
  // =====================================================

  get paginatedEmployees(): Employee[] {

    const startIndex =

      (
        this.currentPage - 1
      )

      *

      this.itemsPerPage;


    const endIndex =

      startIndex +

      this.itemsPerPage;


    return this.filteredEmployees.slice(

      startIndex,

      endIndex

    );

  }


  // =====================================================
  // START ITEM
  // =====================================================

  get startItem(): number {

    if (
      this.filteredEmployees.length === 0
    ) {

      return 0;

    }


    return (

      (
        this.currentPage - 1
      )

      *

      this.itemsPerPage

    )

    +

    1;

  }


  // =====================================================
  // END ITEM
  // =====================================================

  get endItem(): number {

    return Math.min(

      this.currentPage *

      this.itemsPerPage,

      this.filteredEmployees.length

    );

  }


  // =====================================================
  // GO TO PAGE
  // =====================================================

  goToPage(
    page: number
  ): void {

    if (

      page < 1 ||

      page > this.totalPages

    ) {

      return;

    }


    this.currentPage = page;

  }


  // =====================================================
  // NEXT PAGE
  // =====================================================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }


  // =====================================================
  // PREVIOUS PAGE
  // =====================================================

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

    }

  }


  // =====================================================
  // VISIBLE PAGE NUMBERS
  //
  // Example:
  //
  // Previous 1 2 3 ... 10 Next
  //
  // =====================================================

  get visiblePages(): number[] {

    const pages: number[] = [];


    // ===================================================
    // 7 OR LESS PAGES
    // ===================================================

    if (
      this.totalPages <= 7
    ) {

      for (

        let i = 1;

        i <= this.totalPages;

        i++

      ) {

        pages.push(i);

      }


      return pages;

    }


    // ===================================================
    // FIRST PAGE
    // ===================================================

    pages.push(1);


    // ===================================================
    // NEAR START
    // ===================================================

    if (
      this.currentPage <= 4
    ) {

      pages.push(2);

      pages.push(3);

      pages.push(4);

      pages.push(5);

      pages.push(-1);

      pages.push(
        this.totalPages
      );


      return pages;

    }


    // ===================================================
    // NEAR END
    // ===================================================

    if (
      this.currentPage >=
      this.totalPages - 3
    ) {

      pages.push(-1);


      for (

        let i =
          this.totalPages - 4;

        i <= this.totalPages;

        i++

      ) {

        pages.push(i);

      }


      return pages;

    }


    // ===================================================
    // MIDDLE
    // ===================================================

    pages.push(-1);


    pages.push(
      this.currentPage - 1
    );


    pages.push(
      this.currentPage
    );


    pages.push(
      this.currentPage + 1
    );


    pages.push(-1);


    pages.push(
      this.totalPages
    );


    return pages;

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


    if (!query) {

      this.filteredDepartments =
        [
          ...this.departments
        ];

      return;

    }


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


    if (!query) {

      this.filteredDesignations =
        [
          ...this.designations
        ];

      return;

    }


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


    if (!query) {

      this.filteredReportingManagers =
        [
          ...this.reportingManagerEmails
        ];

      return;

    }


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


    this.selectedEmployee =
      employee;


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


    this.updateError = '';


    this.editModalVisible =
      true;

  }


  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  closeEditModal(): void {

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

    if (!this.selectedEmployee) {

      return;

    }


    if (

      !this.editForm.firstName.trim() ||

      !this.editForm.lastName.trim() ||

      !this.editForm.email.trim()

    ) {

      this.updateError =
        'First name, last name and email are required.';

      return;

    }


    this.updateLoading =
      true;

    this.updateError =
      '';


    const payload = {

      firstName:
        this.editForm.firstName.trim(),

      lastName:
        this.editForm.lastName.trim(),

      email:
        this.editForm.email.trim(),

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


    this.employeeService
      .updateEmployee(

        this.selectedEmployee.email,

        payload

      )
      .subscribe({

        next: (
          response: Employee
        ) => {

          console.log(
            'EMPLOYEE UPDATED:',
            response
          );


          this.updateLoading =
            false;

          this.editModalVisible =
            false;

          this.selectedEmployee =
            null;


          this.loadEmployees();

        },


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

}