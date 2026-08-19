import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleManagementComponent } from './role-management/role-management.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeManagementComponent,
    LeaveApprovalComponent,
    AttendanceManagementComponent,
    PayrollComponent,
    ReportsComponent,
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
