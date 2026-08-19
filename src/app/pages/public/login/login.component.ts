import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthService,
  LoginResponse
} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  submitted = false;
  loading = false;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({

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

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {

    this.submitted = true;
    this.loginError = '';

    // Form validation
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // API call
    this.authService.login(loginData).subscribe({

      next: (response: LoginResponse) => {

        this.loading = false;

        // Token save
        localStorage.setItem(
          'token',
          response.token
        );

        // User save
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        // Role ke according future mein redirect kar sakte hain
        if (response.user.role === 'ADMIN') {

          this.router.navigate(['/admin/dashboard']);

        } else {

          this.router.navigate(['/employee/dashboard']);

        }

      },

      error: (error) => {

        this.loading = false;

        this.loginError =
          error?.error?.message ||
          'Invalid email or password.';

      }

    });

  }

  goToSignup(): void {

    this.router.navigate(['/signup']);

  }

}