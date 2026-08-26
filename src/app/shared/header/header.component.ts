import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',

  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // =====================================================
  // CURRENT PORTAL ROLE
  // =====================================================

  @Input() role: string = '';


  // =====================================================
  // SIDEBAR EVENT
  // =====================================================

  @Output() menuToggle =
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
  // USER INITIALS
  // =====================================================

  initials = '';


  // =====================================================
  // USER ACCESS
  // =====================================================

  isAdmin = false;

  isEmployee = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  // =====================================================
  // INITIALIZE
  // =====================================================

  ngOnInit(): void {

    this.loadUserData();

  }


  // =====================================================
  // LOAD USER DATA
  // =====================================================

  private loadUserData(): void {

    // ================================================
    // FIRST NAME
    // ================================================

    this.firstName =
      localStorage.getItem('firstName') || '';


    // ================================================
    // LAST NAME
    // ================================================

    this.lastName =
      localStorage.getItem('lastName') || '';


    // ================================================
    // EMAIL
    // ================================================

    this.email =
      localStorage.getItem('email') || '';


    // ================================================
    // ADMIN ACCESS
    // ================================================

    this.isAdmin =
      localStorage.getItem('admin') === 'true';


    // ================================================
    // EMPLOYEE ACCESS
    // ================================================

    this.isEmployee =
      localStorage.getItem('employee') === 'true';


    // ================================================
    // CREATE INITIALS
    // ================================================

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
  // CHECK BOTH ROLES
  // =====================================================

  get hasBothRoles(): boolean {

    return (
      this.isAdmin &&
      this.isEmployee
    );

  }


  // =====================================================
  // SWITCH ROLE
  // =====================================================

  switchRole(): void {

    // ================================================
    // SAFETY
    // ================================================

    // Switch Role sirf us user ke liye available hai
    // jiske paas Admin + Employee dono access hain.

    if (!this.hasBothRoles) {

      return;

    }


    // ================================================
    // CLOSE PROFILE DROPDOWN
    // ================================================

    this.profileMenuVisible = false;


    // ================================================
    // REMOVE CURRENT SELECTED ROLE
    // ================================================

    /*
     * Example:
     *
     * selectedRole = ADMIN
     *
     * Switch Role ke baad selectedRole remove kar denge.
     *
     * Lekin token/admin/employee ko remove nahi karna.
     */

    localStorage.removeItem(
      'selectedRole'
    );


    // ================================================
    // GO TO ROLE SELECTION PAGE
    // ================================================

    this.router.navigate([
      '/role-selection'
    ]);

  }


  // =====================================================
  // LOGOUT
  // =====================================================

  logout(): void {

    if (this.logoutLoading) {

      return;

    }


    this.logoutLoading = true;


    console.log(
      'Logout API calling...'
    );


    this.authService
      .logout()
      .subscribe({

        // ==========================================
        // SUCCESS
        // ==========================================

        next: (response: any) => {

          console.log(
            'Logout successful:',
            response
          );


          this.clearAuthData();


          this.router.navigate([
            '/login'
          ]);

        },


        // ==========================================
        // ERROR
        // ==========================================

        error: (error: any) => {

          console.error(
            'Logout API error:',
            error
          );


          /*
           * API fail hone par bhi local
           * authentication data clear karenge.
           */

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

    localStorage.removeItem('token');

    localStorage.removeItem('userId');

    localStorage.removeItem('firstName');

    localStorage.removeItem('lastName');

    localStorage.removeItem('email');

    localStorage.removeItem('admin');

    localStorage.removeItem('employee');

    localStorage.removeItem('role');

    localStorage.removeItem('selectedRole');

    localStorage.removeItem('tokenType');

  }

}