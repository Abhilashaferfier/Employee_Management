import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',

  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() role: string = '';

  @Output() menuToggle =
    new EventEmitter<void>();

  profileMenuVisible = false;

  logoutLoading = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  // ==========================================
  // SIDEBAR
  // ==========================================

  toggleSidebar(): void {

    this.menuToggle.emit();

  }


  // ==========================================
  // PROFILE MENU
  // ==========================================

  toggleProfileMenu(): void {

    this.profileMenuVisible =
      !this.profileMenuVisible;

  }


  // ==========================================
  // LOGOUT
  // ==========================================

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

        // ====================================
        // SUCCESS
        // ====================================

        next: (response) => {

          console.log(
            'Logout successful:',
            response
          );


          this.clearAuthData();


          this.router.navigate([
            '/login'
          ]);

        },


        // ====================================
        // ERROR
        // ====================================

        error: (error) => {

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


  // ==========================================
  // CLEAR AUTH DATA
  // ==========================================

  private clearAuthData(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('userId');

    localStorage.removeItem('email');

    localStorage.removeItem('admin');

    localStorage.removeItem('employee');

    localStorage.removeItem('role');

    localStorage.removeItem('selectedRole');

    localStorage.removeItem('tokenType');

  }

}