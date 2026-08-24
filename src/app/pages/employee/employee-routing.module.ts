import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeLayoutComponent } from '../../layouts/employee-layout/employee-layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { PayslipsComponent } from './payslips/payslips.component';
import { ReportsComponent } from './reports/reports.component';

import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';


const routes: Routes = [

  {
    path: '',
   
  
    component: EmployeeLayoutComponent,
    
    canActivate: [
    authGuard,
    roleGuard
    ],

    data: {
    role: 'EMPLOYEE'
    },

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'profile',
        component: ProfileComponent
      },

      {
        path: 'attendance',
        component: AttendanceComponent
      },

      {
        path: 'leave-requests',
        component: LeaveRequestsComponent
      },

      {
        path: 'payslips',
        component: PayslipsComponent
      },

      {
        path: 'reports',
        component: ReportsComponent
      }

    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule {
}