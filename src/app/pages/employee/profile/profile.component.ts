import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  employee = {
    name: 'Abhilasha Thakur',
    designation: 'Frontend Developer',
    email: 'abhilasha@example.com',
    phone: '+91 98765 43210',
    department: 'IT',
    role: 'Employee',
    joiningDate: '10 Jan 2024',
    location: 'Bhopal, India'
  };

  editProfile(): void {
    console.log('Edit profile clicked');
  }

}
