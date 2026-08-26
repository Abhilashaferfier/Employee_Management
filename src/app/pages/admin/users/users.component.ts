import {
  Component,
  OnInit
} from '@angular/core';

import {
  AdminService,
  AdminUser,
  UserAccessRequest
} from '../../../core/services/admin.service';


@Component({
  selector: 'app-users',

  templateUrl:
    './users.component.html',

  styleUrls: [
    './users.component.css'
  ]
})
export class UsersComponent
  implements OnInit {


  // =====================================================
  // USERS FROM API
  // =====================================================

  users: AdminUser[] = [];


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;

  updatingAccess = false;


  // =====================================================
  // MESSAGES
  // =====================================================

  errorMessage = '';

  successMessage = '';


  // =====================================================
  // SELECTED USER
  // =====================================================

  selectedUser: AdminUser | null = null;


  // =====================================================
  // SELECTED ACCESS
  // =====================================================

  selectedIsAdmin = false;

  selectedIsEmployee = false;


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

    this.loading = true;

    this.errorMessage = '';


    this.adminService
      .getAllUsers()
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (response) => {

          console.log(
            'GET USERS RESPONSE:',
            response
          );


          this.users = response;

          this.loading = false;

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (error) => {

          console.error(
            'GET USERS ERROR:',
            error
          );


          this.loading = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to load users.';

        }

      });

  }


  // =====================================================
  // OPEN ACCESS MODAL
  // =====================================================

  selectUser(
    user: AdminUser
  ): void {

    this.selectedUser = user;


    // Current values API se
    // modal me automatically aa jayengi

    this.selectedIsAdmin =
      user.isAdmin;


    this.selectedIsEmployee =
      user.isEmployee;


    this.errorMessage = '';

    this.successMessage = '';

  }


  // =====================================================
  // CLOSE MODAL
  // =====================================================

  closeModal(): void {

    this.selectedUser = null;

  }


  // =====================================================
  // SAVE ACCESS
  // =====================================================

  saveAccess(): void {

    // -----------------------------------------------
    // Safety
    // -----------------------------------------------

    if (!this.selectedUser) {

      return;

    }


    this.updatingAccess = true;

    this.errorMessage = '';

    this.successMessage = '';


    // -----------------------------------------------
    // REQUEST BODY
    // -----------------------------------------------

    const access: UserAccessRequest = {

      isAdmin:
        this.selectedIsAdmin,

      isEmployee:
        this.selectedIsEmployee

    };


    console.log(
      'ACCESS UPDATE REQUEST:',
      access
    );


    // -----------------------------------------------
    // PATCH API
    // -----------------------------------------------

    this.adminService
      .updateUserAccess(
        this.selectedUser.email,
        access
      )
      .subscribe({

        // ===========================================
        // SUCCESS
        // ===========================================

        next: (response) => {

          console.log(
            'ACCESS UPDATE RESPONSE:',
            response
          );


          this.updatingAccess = false;


          this.successMessage =
            response.message ||
            'User access updated successfully.';


          // -----------------------------------------
          // CLOSE MODAL
          // -----------------------------------------

          this.selectedUser = null;


          // -----------------------------------------
          // GET UPDATED USERS
          // -----------------------------------------

          this.loadUsers();

        },


        // ===========================================
        // ERROR
        // ===========================================

        error: (error) => {

          console.error(
            'UPDATE ACCESS ERROR:',
            error
          );


          this.updatingAccess = false;


          this.errorMessage =
            error?.error?.message ||
            'Unable to update user access.';

        }

      });

  }


  // =====================================================
  // ROLE LABEL
  // =====================================================

  getRoleLabel(
    user: AdminUser
  ): string {


    if (
      user.isAdmin &&
      user.isEmployee
    ) {

      return 'Admin + Employee';

    }


    if (user.isAdmin) {

      return 'Admin';

    }


    if (user.isEmployee) {

      return 'Employee';

    }


    return 'No Access';

  }

}