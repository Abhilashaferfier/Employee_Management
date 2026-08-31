import { Component } from '@angular/core';


@Component({

  selector: 'app-employee-layout',

  templateUrl: './employee-layout.component.html',

  styleUrls: ['./employee-layout.component.css']

})
export class EmployeeLayoutComponent {


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