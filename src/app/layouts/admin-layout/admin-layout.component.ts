// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-layout',
//   templateUrl: './admin-layout.component.html',
//   styleUrl: './admin-layout.component.css'
// })
// export class AdminLayoutComponent {

// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  sidebarOpen = true;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}