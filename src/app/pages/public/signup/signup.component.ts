import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import {
  AuthService,
  SignupResponse
} from '../../../services/auth.service';



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


  // =====================================================
  // INITIALIZE FORM
  // =====================================================

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


  // =====================================================
  // FORM GETTERS
  // =====================================================

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


  // =====================================================
  // SIGNUP
  // =====================================================

  onSignup(): void {

    this.submitted = true;

    this.signupError = '';


    // ===================================================
    // VALIDATION
    // ===================================================

    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;

    }


    this.loading = true;


    // ===================================================
    // REQUEST BODY
    // ===================================================

    const signupData = {

      firstName:
        this.signupForm.value.firstName,

      lastName:
        this.signupForm.value.lastName,

      email:
        this.signupForm.value.email,

      password:
        this.signupForm.value.password

    };


    console.log(
      'SIGNUP REQUEST:',
      signupData
    );


    // ===================================================
    // API CALL
    // ===================================================

    this.authService
      .signup(signupData)
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (
          response: SignupResponse
        ) => {

          console.log(
            'SIGNUP RESPONSE:',
            response
          );


          this.loading = false;


          // =============================================
          // SUCCESS MESSAGE
          // =============================================

          alert(
            response.message ||
            'Signup successful. Please login.'
          );


          // =============================================
          // REDIRECT TO LOGIN
          // =============================================

          this.router.navigate([
            '/login'
          ]);

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (error) => {

          console.error(
            'Signup error:',
            error
          );


          this.loading = false;


          this.signupError =
            error?.error?.message ||
            error?.error?.responseMessage ||
            'Unable to create account. Please try again.';

        }

      });

  }


  // =====================================================
  // GO TO LOGIN
  // =====================================================

  goToLogin(): void {

    this.router.navigate([
      '/login'
    ]);

  }

}