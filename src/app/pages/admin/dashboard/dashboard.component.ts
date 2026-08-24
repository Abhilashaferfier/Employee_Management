import { Component } from '@angular/core';

interface Employee {
  name: string;
  email: string;
  department: string;
  status: string;
}

interface LeaveRequest {
  employee: string;
  leaveType: string;
  from: string;
  to: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalEmployees = 120;
  presentToday = 98;
  pendingLeaves = 15;
  pendingPayroll = 2;

  employees: Employee[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      department: 'IT',
      status: 'Active'
    },
    {
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      department: 'HR',
      status: 'Active'
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      department: 'Finance',
      status: 'Active'
    },
    {
      name: 'Emily Davis',
      email: 'emily@example.com',
      department: 'Marketing',
      status: 'Active'
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      department: 'IT',
      status: 'Inactive'
    }
  ];

  leaveRequests: LeaveRequest[] = [
    {
      employee: 'John Doe',
      leaveType: 'Sick Leave',
      from: '20 May',
      to: '22 May',
      status: 'Pending'
    },
    {
      employee: 'Sarah Smith',
      leaveType: 'Casual Leave',
      from: '21 May',
      to: '22 May',
      status: 'Pending'
    },
    {
      employee: 'Emily Davis',
      leaveType: 'Annual Leave',
      from: '25 May',
      to: '30 May',
      status: 'Pending'
    },
    {
      employee: 'Michael Brown',
      leaveType: 'Sick Leave',
      from: '22 May',
      to: '22 May',
      status: 'Pending'
    },
    {
      employee: 'David Wilson',
      leaveType: 'Casual Leave',
      from: '23 May',
      to: '23 May',
      status: 'Pending'
    }
  ];

}
