import { Component } from '@angular/core';

interface LeaveRequest {
  leaveType: string;
  from: string;
  to: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  employeeName = 'Abhilasha';

  attendance = {
    present: 20,
    total: 22
  };

  leaveBalance = 12;

  pendingLeaves = 1;

  latestPayslip = 'May 2025';


  leaveRequests: LeaveRequest[] = [

    {
      leaveType: 'Casual Leave',
      from: '18 May 2025',
      to: '19 May 2025',
      status: 'Pending'
    },

    {
      leaveType: 'Sick Leave',
      from: '10 May 2025',
      to: '10 May 2025',
      status: 'Approved'
    },

    {
      leaveType: 'Annual Leave',
      from: '02 May 2025',
      to: '05 May 2025',
      status: 'Approved'
    }

  ];

}