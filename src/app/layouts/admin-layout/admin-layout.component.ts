import { Component } from '@angular/core';


@Component({

  selector: 'app-admin-layout',

  templateUrl: './admin-layout.component.html',

  styleUrls: ['./admin-layout.component.css']

})
export class AdminLayoutComponent {


  // =====================================================
  // SIDEBAR
  // =====================================================

  sidebarOpen = true;


  // =====================================================
  // TOGGLE SIDEBAR
  // =====================================================

  toggleSidebar(): void {

    this.sidebarOpen =
      !this.sidebarOpen;

  }

}