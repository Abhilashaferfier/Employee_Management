import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { EmployeeLayoutComponent } from '../../layouts/employee-layout/employee-layout.component';
import { EmployeeSidebarComponent } from '../../menu/employee-sidebar/employee-sidebar.component';


import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { PayslipsComponent } from './payslips/payslips.component';
import { ReportsComponent } from './reports/reports.component';
import { LeaveApprovalComponent } from './leave-approval/leave-approval.component';


@NgModule({
  declarations: [
    EmployeeLayoutComponent,
    EmployeeSidebarComponent,
    DashboardComponent,
    ProfileComponent,
    AttendanceComponent,
    LeaveRequestsComponent,
    PayslipsComponent,
    ReportsComponent,
    LeaveApprovalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
