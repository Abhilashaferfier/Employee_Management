import { Component } from '@angular/core';

interface Payroll {
  employee: string;
  month: string;
  basicSalary: string;
  status: string;
}

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {

  summary = {
    employees: 120,
    processed: 110,
    pending: 10
  };

  payrolls: Payroll[] = [
    {
      employee: 'John Doe',
      month: 'May 2025',
      basicSalary: '₹50,000',
      status: 'Processed'
    },
    {
      employee: 'Sarah Smith',
      month: 'May 2025',
      basicSalary: '₹45,000',
      status: 'Processed'
    },
    {
      employee: 'Michael Brown',
      month: 'May 2025',
      basicSalary: '₹55,000',
      status: 'Processed'
    },
    {
      employee: 'Emily Davis',
      month: 'May 2025',
      basicSalary: '₹52,000',
      status: 'Pending'
    },
    {
      employee: 'David Wilson',
      month: 'May 2025',
      basicSalary: '₹48,000',
      status: 'Pending'
    }
  ];

  processPayroll(payroll: Payroll): void {
    payroll.status = 'Processed';
  }

}