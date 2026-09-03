import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleManagementComponent } from './role-management/role-management.component';


import { authGuard } from '../../guards/auth.guard';
import { roleGuard } from '../../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      role: 'ADMIN'
    },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeManagementComponent },
      { path: 'leave-approval', component: LeaveApprovalComponent },
      { path: 'attendance', component: AttendanceManagementComponent },
      { path: 'payroll', component: PayrollComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'roles', component: RoleManagementComponent },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
