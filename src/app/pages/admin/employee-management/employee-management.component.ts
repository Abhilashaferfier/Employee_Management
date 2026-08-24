import { Component } from '@angular/core';

interface Employee {
  name: string;
  email: string;
  department: string;
  status: string;
}

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent {

  searchText = '';

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

  addEmployee(): void {
    console.log('Add employee clicked');
  }

  editEmployee(employee: Employee): void {
    console.log('Edit:', employee);
  }

  deleteEmployee(employee: Employee): void {
    console.log('Delete:', employee);
  }

}
