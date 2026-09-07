import {
  Component,
  OnInit
} from '@angular/core';

import {
  AdminService,
  AdminUser,
  UserAccessRequest
} from '../../../services/rolemanagement.service';


@Component({
  selector: 'app-role-management',

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

    this.loading = true;

    this.errorMessage = '';


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


          this.users =
            response || [];


          // FIRST PAGE

          this.currentPage = 1;


          this.loading = false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (
          error
        ) => {

          console.error(
            'GET USERS ERROR:',
            error
          );


          this.users = [];


          this.loading = false;


          this.errorMessage =

            error?.error?.message ||

            'Unable to load users.';

        }

      });

  }


  // =====================================================
  // FILTERED USERS
  // =====================================================

  get filteredUsers(): AdminUser[] {


    const search =

      this.searchText
        .trim()
        .toLowerCase();


    // NO SEARCH

    if (!search) {

      return this.users;

    }


    // SEARCH BY EMAIL

    return this.users.filter(

      user =>

        (user.email || '')
          .toLowerCase()
          .includes(search)

    );

  }


  // =====================================================
  // TOTAL PAGES
  // =====================================================

  get totalPages(): number {


    if (
      this.filteredUsers.length === 0
    ) {

      return 1;

    }


    return Math.ceil(

      this.filteredUsers.length /

      this.itemsPerPage

    );

  }


  // =====================================================
  // PAGINATED USERS
  // =====================================================

  get paginatedUsers(): AdminUser[] {


    const startIndex =

      (
        this.currentPage - 1
      )

      *

      this.itemsPerPage;


    const endIndex =

      startIndex +

      this.itemsPerPage;


    return this.filteredUsers.slice(

      startIndex,

      endIndex

    );

  }


  // =====================================================
  // START ITEM
  // =====================================================

  get startItem(): number {


    if (
      this.filteredUsers.length === 0
    ) {

      return 0;

    }


    return (

      (
        this.currentPage - 1
      )

      *

      this.itemsPerPage

    ) + 1;

  }


  // =====================================================
  // END ITEM
  // =====================================================

  get endItem(): number {

    return Math.min(

      this.currentPage *

      this.itemsPerPage,

      this.filteredUsers.length

    );

  }


  // =====================================================
  // SEARCH
  // =====================================================

  onSearch(): void {

    this.currentPage = 1;

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
  // VISIBLE PAGES
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
    // CURRENT PAGE NEAR START
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
    // CURRENT PAGE NEAR END
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
    // MIDDLE PAGES
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
  // SELECT USER
  // =====================================================

  selectUser(
    user: AdminUser
  ): void {


    this.selectedUser = user;


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


    if (

      this.updatingAccess

    ) {

      return;

    }


    this.selectedUser = null;

  }


  // =====================================================
  // SAVE ACCESS
  // =====================================================

  saveAccess(): void {


    // SAFETY CHECK

    if (

      !this.selectedUser

    ) {

      return;

    }


    this.updatingAccess = true;

    this.errorMessage = '';

    this.successMessage = '';


    // REQUEST BODY

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


    // API CALL

    this.adminService
      .updateUserAccess(

        this.selectedUser.email,

        access

      )
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response
        ) => {


          console.log(
            'ACCESS UPDATE RESPONSE:',
            response
          );


          this.updatingAccess = false;


          this.successMessage =

            response?.message ||

            'User access updated successfully.';


          // CLOSE MODAL

          this.selectedUser = null;


          // REFRESH USERS

          this.loadUsers();

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (
          error
        ) => {


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


    if (

      user.isAdmin

    ) {

      return 'Admin';

    }


    if (

      user.isEmployee

    ) {

      return 'Employee';

    }


    return 'No Access';

  }

}