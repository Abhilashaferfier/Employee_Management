import { Component } from '@angular/core';

interface Report {
  title: string;
  description: string;
  icon: string;
}

interface RecentDownload {
  reportName: string;
  downloadedOn: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  reports: Report[] = [

    {
      title: 'Attendance Report',
      description: 'View & Download',
      icon: 'pi pi-calendar'
    },

    {
      title: 'Leave Report',
      description: 'View & Download',
      icon: 'pi pi-file'
    },

    {
      title: 'Payroll Report',
      description: 'View & Download',
      icon: 'pi pi-wallet'
    },

    {
      title: 'Tax Report',
      description: 'View & Download',
      icon: 'pi pi-file-edit'
    }

  ];


  recentDownloads: RecentDownload[] = [

    {
      reportName: 'Payslip - May 2025',
      downloadedOn: '20 May 2025'
    },

    {
      reportName: 'Attendance Report - May 2025',
      downloadedOn: '19 May 2025'
    },

    {
      reportName: 'Leave Report - May 2025',
      downloadedOn: '18 May 2025'
    }

  ];


  downloadReport(reportName: string): void {
    console.log('Download report:', reportName);
  }

}
