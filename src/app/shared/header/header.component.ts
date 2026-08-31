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

  @Output()
  menuToggle = new EventEmitter<void>();


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
      this.role === 'Employee'
    );

  }


  // =====================================================
  // LOAD USER DATA
  // =====================================================

  private loadUserData(): void {

    this.firstName =
      localStorage.getItem('firstName') || '';

    this.lastName =
      localStorage.getItem('lastName') || '';

    this.email =
      localStorage.getItem('email') || '';

    this.isAdmin =
      localStorage.getItem('admin') === 'true';

    this.isEmployee =
      localStorage.getItem('employee') === 'true';


    // ===================================================
    // CREATE INITIALS
    // ===================================================

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


    // ===================================================
    // FALLBACK
    // ===================================================

    if (!this.initials.trim()) {

      this.initials = 'U';

    }

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
  // BOTH ROLES
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

    if (!this.hasBothRoles) {

      return;

    }


    this.profileMenuVisible = false;


    // Token/role permissions remove nahi karne.
    // Sirf currently selected role remove karna hai.

    localStorage.removeItem(
      'selectedRole'
    );


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


    this.authService
      .logout()
      .subscribe({

        // =============================================
        // SUCCESS
        // =============================================

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


        // =============================================
        // ERROR
        // =============================================

        error: (error: any) => {

          console.error(
            'Logout API error:',
            error
          );


          // API fail ho tab bhi logout
          // frontend par complete hona chahiye.

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