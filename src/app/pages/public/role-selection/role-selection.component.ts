import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-role-selection',

  templateUrl:
    './role-selection.component.html',

  styleUrls: [
    './role-selection.component.css'
  ]
})
export class RoleSelectionComponent
  implements OnInit {


  // ==================================================
  // ADMIN ACCESS
  // ==================================================

  isAdmin = false;


  // ==================================================
  // EMPLOYEE ACCESS
  // ==================================================

  isEmployee = false;


  // ==================================================
  // USER EMAIL
  // ==================================================

  email = '';


  constructor(
    private router: Router
  ) {}


  // ==================================================
  // INITIALIZE
  // ==================================================

  ngOnInit(): void {

    console.log(
      'ROLE SELECTION LOADED'
    );


    // ================================================
    // TOKEN CHECK
    // ================================================

    const token =
      localStorage.getItem(
        'token'
      );


    // ================================================
    // USER NOT LOGGED IN
    // ================================================

    if (
      !token ||
      token.trim() === ''
    ) {

      console.log(
        'User not logged in. Redirecting to login.'
      );


      this.router.navigate([
        '/login'
      ]);

      return;

    }


    // ================================================
    // GET ADMIN ACCESS
    // ================================================

    this.isAdmin =
      localStorage.getItem(
        'admin'
      ) === 'true';


    // ================================================
    // GET EMPLOYEE ACCESS
    // ================================================

    this.isEmployee =
      localStorage.getItem(
        'employee'
      ) === 'true';


    // ================================================
    // GET EMAIL
    // ================================================

    this.email =
      localStorage.getItem(
        'email'
      ) || '';


    console.log(
      'ADMIN:',
      this.isAdmin
    );


    console.log(
      'EMPLOYEE:',
      this.isEmployee
    );


    console.log(
      'EMAIL:',
      this.email
    );


    // ================================================
    // NO ROLE
    // ================================================
    //
    // Viewer is default dashboard
    //
    // ================================================

    if (
      !this.isAdmin &&
      !this.isEmployee
    ) {

      console.log(
        'No Admin or Employee role. Redirecting to Viewer.'
      );


      this.router.navigate([
        '/viewer/dashboard'
      ]);

      return;

    }


    // ================================================
    // USER HAS AT LEAST ONE ROLE
    // ================================================
    //
    // IMPORTANT:
    //
    // Admin only
    // Employee only
    // Admin + Employee
    //
    // Sab cases me user isi page par rahega.
    //
    // HTML conditions ke according:
    //
    // Viewer Card = Always
    // Admin Card = isAdmin true
    // Employee Card = isEmployee true
    //
    // ================================================

  }


  // ==================================================
  // SELECT ROLE
  // ==================================================

  selectRole(
    role:
      | 'VIEWER'
      | 'ADMIN'
      | 'EMPLOYEE'
  ): void {


    // ==================================================
    // VIEWER
    // ==================================================

    if (
      role === 'VIEWER'
    ) {

      localStorage.setItem(
        'selectedRole',
        'VIEWER'
      );


      this.router.navigate([
        '/viewer/dashboard'
      ]);

      return;

    }


    // ==================================================
    // ADMIN
    // ==================================================

    if (
      role === 'ADMIN'
    ) {

      // ----------------------------------------------
      // ADMIN ACCESS CHECK
      // ----------------------------------------------

      if (
        !this.isAdmin
      ) {

        return;

      }


      // ----------------------------------------------
      // SAVE SELECTED ROLE
      // ----------------------------------------------

      localStorage.setItem(
        'selectedRole',
        'ADMIN'
      );


      // ----------------------------------------------
      // NAVIGATE
      // ----------------------------------------------

      this.router.navigate([
        '/admin/dashboard'
      ]);

      return;

    }


    // ==================================================
    // EMPLOYEE
    // ==================================================

    if (
      role === 'EMPLOYEE'
    ) {

      // ----------------------------------------------
      // EMPLOYEE ACCESS CHECK
      // ----------------------------------------------

      if (
        !this.isEmployee
      ) {

        return;

      }


      // ----------------------------------------------
      // SAVE SELECTED ROLE
      // ----------------------------------------------

      localStorage.setItem(
        'selectedRole',
        'EMPLOYEE'
      );


      // ----------------------------------------------
      // NAVIGATE
      // ----------------------------------------------

      this.router.navigate([
        '/employee/dashboard'
      ]);

      return;

    }

  }

}