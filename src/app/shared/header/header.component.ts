// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {

// }

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() role: string = '';

  @Output() menuToggle = new EventEmitter<void>();

  profileMenuVisible = false;

  toggleSidebar(): void {
    this.menuToggle.emit();
  }

  toggleProfileMenu(): void {
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  logout(): void {
    console.log('Logout clicked');

    // Baad mein authService.logout() yahan add karenge
  }
}