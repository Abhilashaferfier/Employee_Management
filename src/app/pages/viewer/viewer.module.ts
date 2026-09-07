import {
  NgModule
} from '@angular/core';


import {
  CommonModule
} from '@angular/common';


import {
  FormsModule
} from '@angular/forms';


import {
  AutoCompleteModule
} from 'primeng/autocomplete';


import {
  ViewerRoutingModule
} from './viewer-routing.module';


import {
  ViewerLayoutComponent
} from '../../layouts/viewer-layout/viewer-layout.component';


import {
  ViewerSidebarComponent
} from '../../menu/viewer-sidebar/viewer-sidebar.component';


import {
  SharedModule
} from '../../shared/shared.module';


import {
  DashboardComponent
} from './dashboard/dashboard.component';


import {
  EmployeeManagementComponent
} from './employee-management/employee-management.component';


import {
  LeaveApprovalComponent
} from './leave-approval/leave-approval.component';


import {
  AttendanceManagementComponent
} from './attendance-management/attendance-management.component';


import {
  PayrollComponent
} from './payroll/payroll.component';


import {
  ReportsComponent
} from './reports/reports.component';


import {
  RoleManagementComponent
} from './role-management/role-management.component';


import {
  UsersComponent
} from './users/users.component';


// ======================================================
// VIEWER MODULE
// ======================================================

@NgModule({

  declarations: [

    // ==================================================
    // LAYOUT
    // ==================================================

    ViewerLayoutComponent,


    // ==================================================
    // SIDEBAR
    // ==================================================

    ViewerSidebarComponent,


    // ==================================================
    // PAGES
    // ==================================================

    DashboardComponent,

    EmployeeManagementComponent,

    LeaveApprovalComponent,

    AttendanceManagementComponent,

    PayrollComponent,

    ReportsComponent,

    RoleManagementComponent,

    UsersComponent

  ],


  imports: [

    // ==================================================
    // ANGULAR
    // ==================================================

    CommonModule,


    // ==================================================
    // FOR ngModel
    // ==================================================

    FormsModule,


    // ==================================================
    // PRIME NG
    // ==================================================

    AutoCompleteModule,


    // ==================================================
    // ROUTING
    // ==================================================

    ViewerRoutingModule,


    // ==================================================
    // SHARED
    // ==================================================

    SharedModule

  ]

})

export class ViewerModule {

}