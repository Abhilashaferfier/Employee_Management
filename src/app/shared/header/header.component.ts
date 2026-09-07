import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../services/auth.service';


@Component({
  selector: 'app-header',

  templateUrl:
    './header.component.html',

  styleUrls: [
    './header.component.css'
  ]
})
export class HeaderComponent
  implements OnInit {


  // =====================================================
  // CURRENT PORTAL ROLE
  // =====================================================

  @Input()
  role: string = '';


  // =====================================================
  // SIDEBAR EVENT
  // =====================================================

  @Output()
  menuToggle =
    new EventEmitter<void>();


  // =====================================================
  // PROFILE MENU
  // =====================================================

  profileMenuVisible = false;


  // =====================================================
  // LOGOUT
  // =====================================================

  logoutLoading = false;


  // =====================================================
  // USER DETAILS
  // =====================================================

  firstName = '';

  lastName = '';

  email = '';


  // =====================================================
  // INITIALS
  // =====================================================

  initials = '';


  // =====================================================
  // ROLES
  // =====================================================

  isAdmin = false;

  isEmployee = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadUserData();

  }


  // =====================================================
  // PORTAL HEADER CHECK
  // =====================================================

  get isPortalHeader(): boolean {

    return (

      this.role === 'Admin' ||

      this.role === 'Employee' ||

      this.role === 'Viewer'

    );

  }


  // =====================================================
  // LOAD USER DATA
  // =====================================================

  private loadUserData(): void {


    // ===============================================
    // USER DETAILS
    // ===============================================

    this.firstName =
      localStorage.getItem(
        'firstName'
      ) || '';


    this.lastName =
      localStorage.getItem(
        'lastName'
      ) || '';


    this.email =
      localStorage.getItem(
        'email'
      ) || '';


    // ===============================================
    // ADMIN ACCESS
    // ===============================================

    this.isAdmin =
      localStorage.getItem(
        'admin'
      ) === 'true';


    // ===============================================
    // EMPLOYEE ACCESS
    // ===============================================

    this.isEmployee =
      localStorage.getItem(
        'employee'
      ) === 'true';


    // ===============================================
    // CREATE INITIALS
    // ===============================================

    const firstInitial =
      this.firstName
        .trim()
        .charAt(0)
        .toUpperCase();


    const lastInitial =
      this.lastName
        .trim()
        .charAt(0)
        .toUpperCase();


    this.initials =
      `${firstInitial}${lastInitial}`;


    // ===============================================
    // FALLBACK
    // ===============================================

    if (
      !this.initials.trim()
    ) {

      this.initials = 'U';

    }


    // ===============================================
    // CONSOLE
    // ===============================================

    console.log(
      'HEADER ROLE:',
      this.role
    );


    console.log(
      'IS ADMIN:',
      this.isAdmin
    );


    console.log(
      'IS EMPLOYEE:',
      this.isEmployee
    );

  }


  // =====================================================
  // SIDEBAR
  // =====================================================

  toggleSidebar(): void {

    this.menuToggle.emit();

  }


  // =====================================================
  // PROFILE MENU
  // =====================================================

  toggleProfileMenu(): void {

    this.profileMenuVisible =
      !this.profileMenuVisible;

  }


  // =====================================================
  // MULTIPLE ROLES
  // =====================================================
  //
  // Viewer sabke paas default hai.
  //
  // Agar:
  //
  // Admin = false
  // Employee = false
  //
  // => Only Viewer
  // => Switch Role nahi
  //
  //
  // Agar:
  //
  // Admin = true
  //
  // => Viewer + Admin
  // => Switch Role
  //
  //
  // Agar:
  //
  // Employee = true
  //
  // => Viewer + Employee
  // => Switch Role
  //
  // =====================================================

  get hasMultipleRoles(): boolean {

    return (

      this.isAdmin ||

      this.isEmployee

    );

  }


  // =====================================================
  // SWITCH ROLE
  // =====================================================

  switchRole(): void {


    // ===============================================
    // CHECK
    // ===============================================

    if (
      !this.hasMultipleRoles
    ) {

      return;

    }


    // ===============================================
    // CLOSE MENU
    // ===============================================

    this.profileMenuVisible =
      false;


    // ===============================================
    // REMOVE CURRENT ROLE
    // ===============================================

    localStorage.removeItem(
      'selectedRole'
    );


    // ===============================================
    // GO TO ROLE SELECTION
    // ===============================================

    this.router.navigate([
      '/role-selection'
    ]);

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout(): void {


    // ===============================================
    // ALREADY LOADING
    // ===============================================

    if (
      this.logoutLoading
    ) {

      return;

    }


    // ===============================================
    // START
    // ===============================================

    this.logoutLoading =
      true;


    // ===============================================
    // LOGOUT API
    // ===============================================

    this.authService
      .logout()
      .subscribe({


        // =============================================
        // SUCCESS
        // =============================================

        next: (
          response: any
        ) => {


          console.log(
            'Logout successful:',
            response
          );


          this.clearAuthData();


          this.router.navigate([
            '/login'
          ]);

        },


        // =============================================
        // ERROR
        // =============================================

        error: (
          error: any
        ) => {


          console.error(
            'Logout API error:',
            error
          );


          // API fail ho tab bhi frontend logout

          this.clearAuthData();


          this.router.navigate([
            '/login'
          ]);

        }

      });

  }


  // =====================================================
  // CLEAR AUTH DATA
  // =====================================================

  private clearAuthData(): void {


    localStorage.removeItem(
      'token'
    );


    localStorage.removeItem(
      'userId'
    );


    localStorage.removeItem(
      'firstName'
    );


    localStorage.removeItem(
      'lastName'
    );


    localStorage.removeItem(
      'email'
    );


    localStorage.removeItem(
      'admin'
    );


    localStorage.removeItem(
      'employee'
    );


    localStorage.removeItem(
      'role'
    );


    localStorage.removeItem(
      'selectedRole'
    );


    localStorage.removeItem(
      'tokenType'
    );

  }

}