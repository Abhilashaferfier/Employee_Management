import { Component } from '@angular/core';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

  selectedMonth = 'May 2025';

  attendanceSummary = {
    present: 20,
    absent: 2,
    late: 1
  };

  attendanceRecords: AttendanceRecord[] = [

    {
      date: '21 May 2025',
      checkIn: '09:02 AM',
      checkOut: '06:05 PM',
      status: 'Present'
    },

    {
      date: '20 May 2025',
      checkIn: '08:58 AM',
      checkOut: '06:10 PM',
      status: 'Present'
    },

    {
      date: '19 May 2025',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      status: 'Late'
    },

    {
      date: '18 May 2025',
      checkIn: '--',
      checkOut: '--',
      status: 'Absent'
    },

    {
      date: '17 May 2025',
      checkIn: '09:00 AM',
      checkOut: '05:55 PM',
      status: 'Present'
    }

  ];

}
