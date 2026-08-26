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

    if (
      !this.isAdmin &&
      !this.isEmployee
    ) {

      console.log(
        'No access. Redirecting login.'
      );


      this.router.navigate([
        '/login'
      ]);

      return;

    }


    // ================================================
    // ONLY ADMIN
    // ================================================

    if (
      this.isAdmin &&
      !this.isEmployee
    ) {

      console.log(
        'Only Admin access.'
      );


      this.router.navigate([
        '/admin/dashboard'
      ]);

      return;

    }


    // ================================================
    // ONLY EMPLOYEE
    // ================================================

    if (
      !this.isAdmin &&
      this.isEmployee
    ) {

      console.log(
        'Only Employee access.'
      );


      this.router.navigate([
        '/employee/dashboard'
      ]);

      return;

    }


    // ================================================
    // BOTH ROLES
    // ================================================

    if (
      this.isAdmin &&
      this.isEmployee
    ) {

      console.log(
        'Admin + Employee access.'
      );


      /*
       * IMPORTANT:
       *
       * Yahan koi navigation nahi hai.
       *
       * User isi page par rahega.
       *
       * HTML automatically dono cards
       * show karega because:
       *
       * isAdmin = true
       * isEmployee = true
       */

      return;

    }

  }


  // ==================================================
  // SELECT ROLE
  // ==================================================

  selectRole(
    role: 'ADMIN' | 'EMPLOYEE'
  ): void {


    // ==================================================
    // ADMIN
    // ==================================================

    if (
      role === 'ADMIN'
    ) {

      if (
        !this.isAdmin
      ) {

        return;

      }


      localStorage.setItem(
        'selectedRole',
        'ADMIN'
      );


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

      if (
        !this.isEmployee
      ) {

        return;

      }


      localStorage.setItem(
        'selectedRole',
        'EMPLOYEE'
      );


      this.router.navigate([
        '/employee/dashboard'
      ]);

      return;

    }

  }

}