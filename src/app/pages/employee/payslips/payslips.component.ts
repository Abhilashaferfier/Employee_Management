import { Component } from '@angular/core';

interface Payslip {
  month: string;
  grossSalary: string;
  netSalary: string;
  status: string;
}

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.css']
})
export class PayslipsComponent {

  payslips: Payslip[] = [

    {
      month: 'May 2025',
      grossSalary: '₹50,000',
      netSalary: '₹42,000',
      status: 'Paid'
    },

    {
      month: 'April 2025',
      grossSalary: '₹50,000',
      netSalary: '₹42,000',
      status: 'Paid'
    },

    {
      month: 'March 2025',
      grossSalary: '₹50,000',
      netSalary: '₹42,000',
      status: 'Paid'
    },

    {
      month: 'February 2025',
      grossSalary: '₹50,000',
      netSalary: '₹42,000',
      status: 'Paid'
    }

  ];


  downloadPayslip(month: string): void {
    console.log('Download payslip:', month);
  }

}
