import { Component } from '@angular/core';

interface LeaveApproval {
  employee: string;
  leaveType: string;
  from: string;
  to: string;
  reason: string;
  status: string;
}

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.css']
})
export class LeaveApprovalComponent {

  leaveRequests: LeaveApproval[] = [
    {
      employee: 'John Doe',
      leaveType: 'Sick Leave',
      from: '20 May',
      to: '22 May',
      reason: 'Medical reason',
      status: 'Pending'
    },
    {
      employee: 'Sarah Smith',
      leaveType: 'Casual Leave',
      from: '21 May',
      to: '22 May',
      reason: 'Personal work',
      status: 'Pending'
    },
    {
      employee: 'Emily Davis',
      leaveType: 'Annual Leave',
      from: '25 May',
      to: '30 May',
      reason: 'Vacation',
      status: 'Pending'
    },
    {
      employee: 'Michael Brown',
      leaveType: 'Sick Leave',
      from: '22 May',
      to: '22 May',
      reason: 'Headache',
      status: 'Pending'
    },
    {
      employee: 'David Wilson',
      leaveType: 'Casual Leave',
      from: '23 May',
      to: '23 May',
      reason: 'Family event',
      status: 'Pending'
    }
  ];

  approve(request: LeaveApproval): void {
    request.status = 'Approved';
  }

  reject(request: LeaveApproval): void {
    request.status = 'Rejected';
  }

}
