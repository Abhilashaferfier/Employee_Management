import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';




import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminSidebarComponent } from '../../menu/admin-sidebar/admin-sidebar.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminSidebarComponent,

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
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
