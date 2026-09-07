import { Component } from '@angular/core';

interface Report {
  name: string;
  description: string;
  icon: string;
}

interface RecentReport {
  name: string;
  generatedOn: string;
  generatedBy: string;
}

@Component({
  selector: 'app-admin-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports: Report[] = [
    {
      name: 'Attendance Report',
      description: 'View Details',
      icon: 'pi pi-calendar'
    },
    {
      name: 'Leave Report',
      description: 'View Details',
      icon: 'pi pi-file'
    },
    {
      name: 'Payroll Report',
      description: 'View Details',
      icon: 'pi pi-wallet'
    },
    {
      name: 'Employee Report',
      description: 'View Details',
      icon: 'pi pi-users'
    }
  ];

  recentReports: RecentReport[] = [
    {
      name: 'Attendance Report',
      generatedOn: '20 May 2025',
      generatedBy: 'Admin'
    },
    {
      name: 'Leave Report',
      generatedOn: '20 May 2025',
      generatedBy: 'Admin'
    },
    {
      name: 'Payroll Report',
      generatedOn: '16 May 2025',
      generatedBy: 'Admin'
    },
    {
      name: 'Employee Report',
      generatedOn: '17 May 2025',
      generatedBy: 'Admin'
    }
  ];

  viewReport(report: string): void {
    console.log('View report:', report);
  }

  downloadReport(report: string): void {
    console.log('Download:', report);
  }

}