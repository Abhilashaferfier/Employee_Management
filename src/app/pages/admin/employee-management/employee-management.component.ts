import {
  Component,
  OnInit
} from '@angular/core';

import {
  EmployeeManagementService,
  Employee
} from '../../../services/employee-management.service';


// =====================================================
// COMPONENT
// =====================================================

@Component({
  selector: 'app-employee-management',

  templateUrl:
    './employee-management.component.html',

  styleUrls:
    ['./employee-management.component.css']
})
export class EmployeeManagementComponent
  implements OnInit {


  // =====================================================
  // EMPLOYEES FROM API
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
  // FRONTEND DEPARTMENT OPTIONS
  // =====================================================

  departments: string[] = [

    'IT',

    'HR',

    'Finance',

    'Sales',

    'Marketing',

    'Design'

  ];


  // =====================================================
  // FRONTEND DESIGNATION OPTIONS
  // =====================================================

  designations: string[] = [

    'Software Developer',

    'Senior Software Developer',

    'HR Executive',

    'Accountant',

    'Marketing Executive',

    'UI Designer',

    'Project Manager',

    'Team Lead'

  ];


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

    reportingManagerId: '',

    reportingManagerName: '',

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

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: Employee[]
        ) => {

          console.log(
            'ALL EMPLOYEES:',
            response
          );


          this.employees =
            response || [];


          this.loadingEmployees =
            false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (error) => {

          console.error(
            'GET EMPLOYEES ERROR:',
            error
          );


          this.employees = [];


          this.errorMessage =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to load employees.';


          this.loadingEmployees =
            false;

        }

      });

  }


  // =====================================================
  // REPORTING MANAGER OPTIONS
  // =====================================================

  get reportingManagers(): Employee[] {

    /*
     * Reporting Manager API se alag nahi aa raha.
     *
     * Existing employees API se employees ki list
     * lekar reporting manager dropdown banega.
     */

    return this.employees;

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


    // ===============================================
    // PREFILL FORM
    // ===============================================

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

      reportingManagerId:
        employee.reportingManagerId || '',

      reportingManagerName:
        employee.reportingManagerName || '',

      status:
        employee.status || ''

    };


    this.updateError = '';

    this.editModalVisible =
      true;

  }


  // =====================================================
  // REPORTING MANAGER CHANGE
  // =====================================================

  onReportingManagerChange(): void {

    const manager =
      this.employees.find(
        employee =>
          employee.id ===
          this.editForm.reportingManagerId
      );


    if (manager) {

      this.editForm.reportingManagerName =
        `${manager.firstName} ${manager.lastName}`;

    } else {

      this.editForm.reportingManagerName =
        '';

    }

  }


  // =====================================================
  // CLOSE MODAL
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


    // ===============================================
    // BASIC VALIDATION
    // ===============================================

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


    // ===============================================
    // PATCH PAYLOAD
    // ===============================================

    const payload = {

      firstName:
        this.editForm.firstName.trim(),

      lastName:
        this.editForm.lastName.trim(),

      email:
        this.editForm.email.trim(),

      designation:
        this.editForm.designation || null,

      departmentName:
        this.editForm.departmentName || null,

      dateOfJoining:
        this.editForm.dateOfJoining || null,

      reportingManagerId:
        this.editForm.reportingManagerId || null,

      reportingManagerName:
        this.editForm.reportingManagerName || null,

      status:
        this.editForm.status || 'ACTIVE'

    };


    console.log(
      'PATCH PAYLOAD:',
      payload
    );


    // ===============================================
    // PATCH API
    // ===============================================

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
          // Update employee in local array
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
          // Close modal
          // -------------------------------------------

          this.updateLoading =
            false;

          this.editModalVisible =
            false;

          this.selectedEmployee =
            null;


          // -------------------------------------------
          // Optional: reload latest API data
          // -------------------------------------------

          this.loadEmployees();

        },


        // =============================================
        // ERROR
        // =============================================

        error: (error) => {

          console.error(
            'PATCH EMPLOYEE ERROR:',
            error
          );


          this.updateError =
            error?.error?.responseMessage ||
            error?.error?.message ||
            'Unable to update employee.';


          this.updateLoading =
            false;

        }

      });

  }


  // =====================================================
  // DELETE
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
  // FILTER
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

          employee.email
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

          (employee.reportingManagerName || '')
            .toLowerCase()
            .includes(search)

        );

      }
    );

  }

}