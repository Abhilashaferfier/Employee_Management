import { Component } from '@angular/core';

interface Role {
  name: string;
  description: string;
  employees: number;
  status: string;
}

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent {

  roles: Role[] = [
    {
      name: 'Admin',
      description: 'Full system access',
      employees: 2,
      status: 'Active'
    },
    {
      name: 'HR Manager',
      description: 'Manage employees and leaves',
      employees: 4,
      status: 'Active'
    },
    {
      name: 'Employee',
      description: 'Employee portal access',
      employees: 114,
      status: 'Active'
    }
  ];

  addRole(): void {
    console.log('Add role');
  }

  editRole(role: Role): void {
    console.log('Edit role:', role);
  }

}
