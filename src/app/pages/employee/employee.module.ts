import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { PayslipsComponent } from './payslips/payslips.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    AttendanceComponent,
    LeaveRequestsComponent,
    PayslipsComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
