import {
  Component,
  OnInit
} from '@angular/core';

import {
  UsersService
} from '../../../services/users.service';


// ======================================================
// USER INTERFACE
// ======================================================

export interface User {

  userId: string;

  firstName: string;

  lastName: string;

  email: string;

  status: string;

}


// ======================================================
// ADD USER PAYLOAD
// ======================================================

export interface AddUserPayload {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

}


// ======================================================
// COMPONENT
// ======================================================

@Component({

  selector:
    'app-users',

  templateUrl:
    './users.component.html',

  styleUrls: [
    './users.component.css'
  ]

})
export class UsersComponent
  implements OnInit {


  // ====================================================
  // USERS
  // ====================================================

  users: User[] = [];


  // ====================================================
  // SEARCH
  // ====================================================

  searchText = '';


  // ====================================================
  // LOADING
  // ====================================================

  loading = false;


  // ====================================================
  // ERROR
  // ====================================================

  errorMessage = '';


  // ====================================================
  // PAGINATION
  // ====================================================

  currentPage = 1;

  itemsPerPage = 8;


  // ====================================================
  // ADD USER MODAL
  // ====================================================

  addUserModalVisible = false;


  // ====================================================
  // ADD USER LOADING
  // ====================================================

  addUserLoading = false;


  // ====================================================
  // ADD USER ERROR
  // ====================================================

  addUserError = '';


  // ====================================================
  // ADD USER FORM
  // ====================================================

  addUserForm: AddUserPayload = {

    firstName: '',

    lastName: '',

    email: '',

    password: ''

  };


  // ====================================================
  // CONSTRUCTOR
  // ====================================================

  constructor(
    private usersService:
      UsersService
  ) {}


  // ====================================================
  // INIT
  // ====================================================

  ngOnInit(): void {

    this.loadUsers();

  }


  // ====================================================
  // GET ALL USERS
  // ====================================================

  loadUsers(): void {

    this.loading = true;

    this.errorMessage = '';


    this.usersService
      .getAllUsers()
      .subscribe({

        next: (
          response: User[]
        ) => {

          console.log(
            'GET USERS RESPONSE:',
            response
          );


          this.users =
            response || [];


          this.currentPage = 1;


          this.loading =
            false;

        },


        error: (
          error
        ) => {

          console.error(
            'GET USERS ERROR:',
            error
          );


          this.users = [];


          this.loading =
            false;


          this.errorMessage =

            error?.error?.message ||

            error?.error?.responseMessage ||

            'Unable to load users.';

        }

      });

  }


  // ====================================================
  // OPEN ADD USER MODAL
  // ====================================================

  openAddUserModal(): void {

    // RESET FORM

    this.addUserForm = {

      firstName: '',

      lastName: '',

      email: '',

      password: ''

    };


    // RESET ERROR

    this.addUserError = '';


    // OPEN MODAL

    this.addUserModalVisible = true;

  }


  // ====================================================
  // CLOSE ADD USER MODAL
  // ====================================================

  closeAddUserModal(): void {

    // DO NOT CLOSE WHILE API IS RUNNING

    if (this.addUserLoading) {

      return;

    }


    this.addUserModalVisible = false;


    this.addUserError = '';

  }


  // ====================================================
  // ADD USER
  // ====================================================

  addUser(): void {

    // ================================================
    // RESET ERROR
    // ================================================

    this.addUserError = '';


    // ================================================
    // VALIDATION
    // ================================================

    if (

      !this.addUserForm.firstName.trim() ||

      !this.addUserForm.lastName.trim() ||

      !this.addUserForm.email.trim() ||

      !this.addUserForm.password.trim()

    ) {

      this.addUserError =
        'All fields are required.';

      return;

    }


    // ================================================
    // EMAIL VALIDATION
    // ================================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (

      !emailPattern.test(
        this.addUserForm.email.trim()
      )

    ) {

      this.addUserError =
        'Please enter a valid email address.';

      return;

    }


    // ================================================
    // START LOADING
    // ================================================

    this.addUserLoading = true;


    // ================================================
    // CREATE PAYLOAD
    // ================================================

    const payload: AddUserPayload = {

      firstName:
        this.addUserForm.firstName.trim(),

      lastName:
        this.addUserForm.lastName.trim(),

      email:
        this.addUserForm.email.trim(),

      password:
        this.addUserForm.password

    };


    console.log(
      'ADD USER PAYLOAD:',
      payload
    );


    // ================================================
    // ADD USER API
    // ================================================

    this.usersService
      .addUser(payload)
      .subscribe({

        // ============================================
        // SUCCESS
        // ============================================

        next: (
          response
        ) => {

          console.log(
            'USER ADDED:',
            response
          );


          // STOP LOADING

          this.addUserLoading = false;


          // CLOSE MODAL

          this.addUserModalVisible =
            false;


          // RELOAD USERS

          this.loadUsers();

        },


        // ============================================
        // ERROR
        // ============================================

        error: (
          error
        ) => {

          console.error(
            'ADD USER ERROR:',
            error
          );


          this.addUserError =

            error?.error?.message ||

            error?.error?.responseMessage ||

            'Unable to add user.';


          this.addUserLoading = false;

        }

      });

  }


  // ====================================================
  // FILTERED USERS
  // ====================================================

  get filteredUsers(): User[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    if (!search) {

      return this.users;

    }


    return this.users.filter(
      user => {

        const firstName =
          (
            user.firstName || ''
          )
            .toLowerCase();


        const lastName =
          (
            user.lastName || ''
          )
            .toLowerCase();


        const email =
          (
            user.email || ''
          )
            .toLowerCase();


        const fullName =
          `${user.firstName || ''} ${user.lastName || ''}`
            .toLowerCase();


        return (

          firstName.includes(search) ||

          lastName.includes(search) ||

          fullName.includes(search) ||

          email.includes(search)

        );

      }
    );

  }


  // ====================================================
  // SEARCH
  // ====================================================

  onSearch(): void {

    this.currentPage = 1;

  }


  // ====================================================
  // TOTAL PAGES
  // ====================================================

  get totalPages(): number {

    return Math.max(

      1,

      Math.ceil(
        this.filteredUsers.length /
        this.itemsPerPage
      )

    );

  }


  // ====================================================
  // PAGINATED USERS
  // ====================================================

  get paginatedUsers(): User[] {

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


  // ====================================================
  // START USER
  // ====================================================

  get startUser(): number {

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


  // ====================================================
  // END USER
  // ====================================================

  get endUser(): number {

    return Math.min(

      this.currentPage *
      this.itemsPerPage,

      this.filteredUsers.length

    );

  }


  // ====================================================
  // PREVIOUS PAGE
  // ====================================================

  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

    }

  }


  // ====================================================
  // NEXT PAGE
  // ====================================================

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }


  // ====================================================
  // GO TO PAGE
  // ====================================================

  goToPage(
    page: number
  ): void {

    if (

      page >= 1 &&

      page <= this.totalPages

    ) {

      this.currentPage =
        page;

    }

  }


  // ====================================================
  // VISIBLE PAGE NUMBERS
  // ====================================================

  get visiblePages(): number[] {

    const pages: number[] = [];


    if (
      this.totalPages <= 5
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


    if (
      this.currentPage <= 3
    ) {

      return [
        2,
        3,
        4
      ];

    }


    if (
      this.currentPage >=
      this.totalPages - 2
    ) {

      return [

        this.totalPages - 3,

        this.totalPages - 2,

        this.totalPages - 1

      ];

    }


    return [

      this.currentPage - 1,

      this.currentPage,

      this.currentPage + 1

    ];

  }


  // ====================================================
  // SHOW FIRST PAGE
  // ====================================================

  get showFirstPage(): boolean {

    if (
      this.totalPages <= 5
    ) {

      return false;

    }


    return !this.visiblePages.includes(
      1
    );

  }


  // ====================================================
  // SHOW LAST PAGE
  // ====================================================

  get showLastPage(): boolean {

    if (
      this.totalPages <= 5
    ) {

      return false;

    }


    return !this.visiblePages.includes(
      this.totalPages
    );

  }


  // ====================================================
  // SHOW LEFT DOTS
  // ====================================================

  get showLeftDots(): boolean {

    return (

      this.totalPages > 5 &&

      this.visiblePages.length > 0 &&

      this.visiblePages[0] > 2

    );

  }


  // ====================================================
  // SHOW RIGHT DOTS
  // ====================================================

  get showRightDots(): boolean {

    const lastVisiblePage =

      this.visiblePages[
        this.visiblePages.length - 1
      ];


    return (

      this.totalPages > 5 &&

      lastVisiblePage <
      this.totalPages - 1

    );

  }

}