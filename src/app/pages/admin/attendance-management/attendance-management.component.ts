import { Component } from '@angular/core';

interface Attendance {
  employee: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css']
})
export class AttendanceManagementComponent {

  selectedDate = '21 May 2025';

  summary = {
    present: 98,
    absent: 15,
    late: 3
  };

  records: Attendance[] = [
    {
      employee: 'John Doe',
      checkIn: '09:02 AM',
      checkOut: '06:05 PM',
      status: 'Present'
    },
    {
      employee: 'Sarah Smith',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      status: 'Present'
    },
    {
      employee: 'Michael Brown',
      checkIn: '09:30 AM',
      checkOut: '06:15 PM',
      status: 'Late'
    },
    {
      employee: 'Emily Davis',
      checkIn: '--',
      checkOut: '--',
      status: 'Absent'
    },
    {
      employee: 'David Wilson',
      checkIn: '08:55 AM',
      checkOut: '05:45 PM',
      status: 'Present'
    }
  ];

}
