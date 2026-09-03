import {
  Component,
  OnInit
} from '@angular/core';

import { UsersService } from '../../../services/users.service';


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
// ADD USER REQUEST INTERFACE
// ======================================================

export interface AddUserRequest {

  firstName: string;

  lastName: string;

  email: string;

  password: string;

}


// ======================================================
// COMPONENT
// ======================================================

@Component({

  selector: 'app-users',

  templateUrl: './users.component.html',

  styleUrls: ['./users.component.css']

})
export class UsersComponent implements OnInit {


  // ======================================================
  // USERS LIST
  // ======================================================

  users: User[] = [];


  // ======================================================
  // LOADING
  // ======================================================

  loading = false;


  // ======================================================
  // ADD USER LOADING
  // ======================================================

  addingUser = false;


  // ======================================================
  // MODAL
  // ======================================================

  showAddUserModal = false;


  // ======================================================
  // FORM FIELDS
  // ======================================================

  firstName = '';

  lastName = '';

  email = '';

  password = '';


  // ======================================================
  // MESSAGES
  // ======================================================

  errorMessage = '';

  successMessage = '';


  // ======================================================
  // CONSTRUCTOR
  // ======================================================

  constructor(
    private usersService: UsersService
  ) {}


  // ======================================================
  // NG ON INIT
  // ======================================================

  ngOnInit(): void {

    this.loadUsers();

  }


  // ======================================================
  // GET ALL USERS
  // ======================================================

  loadUsers(): void {

    this.loading = true;

    this.errorMessage = '';


    this.usersService.getAllUsers().subscribe({

      next: (response: User[]) => {

        console.log(
          'GET USERS RESPONSE:',
          response
        );


        this.users = response || [];

        this.loading = false;

      },


      error: (error) => {

        console.error(
          'GET USERS ERROR:',
          error
        );


        this.loading = false;


        this.errorMessage =
          error?.error?.message ||
          error?.error?.responseMessage ||
          'Unable to load users.';

      }

    });

  }


  // ======================================================
  // OPEN ADD USER MODAL
  // ======================================================

  openAddUserModal(): void {

    this.resetForm();

    this.errorMessage = '';

    this.successMessage = '';

    this.showAddUserModal = true;

  }


  // ======================================================
  // CLOSE ADD USER MODAL
  // ======================================================

  closeAddUserModal(): void {

    if (this.addingUser) {

      return;

    }


    this.showAddUserModal = false;

    this.resetForm();

  }


  // ======================================================
  // RESET FORM
  // ======================================================

  resetForm(): void {

    this.firstName = '';

    this.lastName = '';

    this.email = '';

    this.password = '';

  }


  // ======================================================
  // ADD USER
  // ======================================================

  addUser(): void {

    this.errorMessage = '';

    this.successMessage = '';


    // ----------------------------------------------------
    // REQUIRED FIELD VALIDATION
    // ----------------------------------------------------

    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.password.trim()
    ) {

      this.errorMessage =
        'Please fill all fields.';

      return;

    }


    // ----------------------------------------------------
    // EMAIL VALIDATION
    // ----------------------------------------------------

    if (
      !this.isValidEmail(
        this.email.trim()
      )
    ) {

      this.errorMessage =
        'Please enter a valid email address.';

      return;

    }


    // ----------------------------------------------------
    // PASSWORD VALIDATION
    // ----------------------------------------------------

    if (this.password.length < 6) {

      this.errorMessage =
        'Password must be at least 6 characters.';

      return;

    }


    // ====================================================
    // CREATE REQUEST OBJECT
    // ====================================================

    const newUser: AddUserRequest = {

      firstName:
        this.firstName.trim(),

      lastName:
        this.lastName.trim(),

      email:
        this.email.trim(),

      password:
        this.password

    };


    console.log(
      'ADD USER REQUEST:',
      newUser
    );


    // ====================================================
    // API LOADING
    // ====================================================

    this.addingUser = true;


    // ====================================================
    // CALL ADD USER API
    // ====================================================

    this.usersService
      .addUser(newUser)
      .subscribe({

        // ================================================
        // SUCCESS
        // ================================================

        next: (response) => {

          console.log(
            'ADD USER RESPONSE:',
            response
          );


          this.addingUser = false;


          this.successMessage =
            response?.message ||
            response?.responseMessage ||
            'User added successfully.';


          // ----------------------------------------------
          // CLOSE MODAL
          // ----------------------------------------------

          this.showAddUserModal = false;


          // ----------------------------------------------
          // CLEAR FORM
          // ----------------------------------------------

          this.resetForm();


          // ----------------------------------------------
          // REFRESH USERS
          // ----------------------------------------------

          this.loadUsers();

        },


        // ================================================
        // ERROR
        // ================================================

        error: (error) => {

          console.error(
            'ADD USER ERROR:',
            error
          );


          this.addingUser = false;


          this.errorMessage =
            error?.error?.message ||
            error?.error?.responseMessage ||
            'Unable to add user.';

        }

      });

  }


  // ======================================================
  // EMAIL VALIDATION
  // ======================================================

  isValidEmail(
    email: string
  ): boolean {

    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(email);

  }


  // ======================================================
  // GET FULL NAME
  // ======================================================

  getFullName(
    user: User
  ): string {

    return `${user.firstName} ${user.lastName}`;

  }

}
