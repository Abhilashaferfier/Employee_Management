import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';


// =====================================================
// VIEWER LAYOUT
// =====================================================

import {
  ViewerLayoutComponent
} from '../../layouts/viewer-layout/viewer-layout.component';


// =====================================================
// VIEWER COMPONENTS
// =====================================================

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


// =====================================================
// AUTH GUARD
// =====================================================

import {
  authGuard
} from '../../guards/auth.guard';


// =====================================================
// ROUTES
// =====================================================

const routes: Routes = [

  {

    path: '',

    component:
      ViewerLayoutComponent,


    // ===============================================
    // VIEWER MUST BE LOGGED IN
    // ===============================================

    canActivate: [
      authGuard
    ],


    children: [

      // =============================================
      // DASHBOARD
      // =============================================

      {

        path: 'dashboard',

        component:
          DashboardComponent

      },


      // =============================================
      // EMPLOYEE MANAGEMENT
      // =============================================

      {

        path: 'employees',

        component:
          EmployeeManagementComponent

      },


      // =============================================
      // LEAVE APPROVAL
      // =============================================

      {

        path: 'leave-approval',

        component:
          LeaveApprovalComponent

      },


      // =============================================
      // ATTENDANCE
      // =============================================

      {

        path: 'attendance',

        component:
          AttendanceManagementComponent

      },


      // =============================================
      // PAYROLL
      // =============================================

      {

        path: 'payroll',

        component:
          PayrollComponent

      },


      // =============================================
      // REPORTS
      // =============================================

      {

        path: 'reports',

        component:
          ReportsComponent

      },


      // =============================================
      // ROLE MANAGEMENT
      // =============================================

      {

        path: 'roles',

        component:
          RoleManagementComponent

      },


      // =============================================
      // USERS
      // =============================================

      {

        path: 'users',

        component:
          UsersComponent

      },


      // =============================================
      // DEFAULT
      // =============================================

      {

        path: '',

        redirectTo:
          'dashboard',

        pathMatch:
          'full'

      }

    ]

  }

];


// =====================================================
// MODULE
// =====================================================

@NgModule({

  imports: [
    RouterModule.forChild(
      routes
    )
  ],

  exports: [
    RouterModule
  ]

})

export class ViewerRoutingModule {}