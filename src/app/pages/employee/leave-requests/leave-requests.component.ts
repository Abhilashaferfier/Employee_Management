import { Component } from '@angular/core';

interface LeaveRequest {
  leaveType: string;
  from: string;
  to: string;
  status: string;
}

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent {

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
    },

    {
      leaveType: 'Casual Leave',
      from: '28 Apr 2025',
      to: '28 Apr 2025',
      status: 'Rejected'
    }

  ];


  applyLeave(): void {
    console.log('Apply leave clicked');
  }

}
