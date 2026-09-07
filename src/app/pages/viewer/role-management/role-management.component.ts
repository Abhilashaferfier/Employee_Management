import {
  Component,
  OnInit
} from '@angular/core';

import {
  AdminService,
  AdminUser
} from '../../../services/rolemanagement.service';


@Component({

  selector:
    'app-role-management',

  templateUrl:
    './role-management.component.html',

  styleUrls: [
    './role-management.component.css'
  ]

})
export class RoleManagementComponent
  implements OnInit {


  // =====================================================
  // USERS
  // =====================================================

  users: AdminUser[] = [];


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  errorMessage = '';


  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  successMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private adminService: AdminService
  ) {}


  // =====================================================
  // INITIALIZE
  // =====================================================

  ngOnInit(): void {

    this.loadUsers();

  }


  // =====================================================
  // GET ALL USERS
  // =====================================================

  loadUsers(): void {

    // ===================================================
    // START LOADING
    // ===================================================

    this.loading = true;

    this.errorMessage = '';


    // ===================================================
    // API CALL
    // ===================================================

    this.adminService
      .getAllUsers()
      .subscribe({


        // =================================================
        // SUCCESS
        // =================================================

        next: (
          response: AdminUser[]
        ) => {

          console.log(
            'GET USERS RESPONSE:',
            response
          );


          // -----------------------------------------------
          // STORE USERS
          // -----------------------------------------------

          this.users =
            response || [];


          // -----------------------------------------------
          // STOP LOADING
          // -----------------------------------------------

          this.loading =
            false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error: any
        ) => {

          console.error(
            'GET USERS ERROR:',
            error
          );


          // -----------------------------------------------
          // CLEAR USERS
          // -----------------------------------------------

          this.users = [];


          // -----------------------------------------------
          // ERROR MESSAGE
          // -----------------------------------------------

          this.errorMessage =

            error?.error?.message ||

            error?.error?.responseMessage ||

            error?.message ||

            'Unable to load users.';


          // -----------------------------------------------
          // STOP LOADING
          // -----------------------------------------------

          this.loading =
            false;

        }

      });

  }

}