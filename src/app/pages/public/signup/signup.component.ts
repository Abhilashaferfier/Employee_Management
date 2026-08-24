
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  submitted = false;
  loading = false;
  signupError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.signupForm = this.fb.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSignup(): void {

    this.submitted = true;
    this.signupError = '';

    // Validation
    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const signupData = {

      firstName: this.signupForm.value.firstName,

      lastName: this.signupForm.value.lastName,

      email: this.signupForm.value.email,

      password: this.signupForm.value.password

    };

    // API CALL
    this.authService.signup(signupData).subscribe({

      next: (response) => {

        console.log('Signup successful:', response);

        this.loading = false;

        alert(
          response.message ||
          'Signup successful. Please login.'
        );

        // Signup ke baad login
        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.error('Signup error:', error);

        this.loading = false;

        this.signupError =
          error?.error?.message ||
          'Unable to create account. Please try again.';

      }

    });

  }

  goToLogin(): void {

    this.router.navigate(['/login']);

  }

}