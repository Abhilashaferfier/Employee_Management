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

  styleUrls:
    ['./role-selection.component.css']
})
export class RoleSelectionComponent
  implements OnInit {


  // ==================================================
  // ACCESS
  // ==================================================

  isAdmin = false;

  isEmployee = false;


  // ==================================================
  // USER EMAIL
  // ==================================================

  email = '';


  constructor(
    private router: Router
  ) {}


  // ==================================================
  // INIT
  // ==================================================

  ngOnInit(): void {

    // ================================================
    // GET ACCESS FROM LOCAL STORAGE
    // ================================================

    this.isAdmin =
      localStorage.getItem('admin') === 'true';


    this.isEmployee =
      localStorage.getItem('employee') === 'true';


    this.email =
      localStorage.getItem('email') || '';


    // ================================================
    // NO ACCESS
    // ================================================

    if (
      !this.isAdmin &&
      !this.isEmployee
    ) {

      localStorage.clear();

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

      this.router.navigate([
        '/employee/dashboard'
      ]);

      return;

    }


    // ================================================
    // BOTH ROLES
    //
    // Yahan kuch navigate nahi karna.
    //
    // Cards show honge.
    // ================================================

  }


  // ==================================================
  // SELECT ROLE
  // ==================================================

  selectRole(
    role: 'ADMIN' | 'EMPLOYEE'
  ): void {


    // ================================================
    // ADMIN
    // ================================================

    if (
      role === 'ADMIN'
    ) {

      // Safety check

      if (!this.isAdmin) {

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


    // ================================================
    // EMPLOYEE
    // ================================================

    if (
      role === 'EMPLOYEE'
    ) {

      // Safety check

      if (!this.isEmployee) {

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