import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService,
  LoginResponse
} from '../../../services/auth.service';


@Component({
  selector: 'app-login',

  templateUrl:
    './login.component.html',

  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent
  implements OnInit {


  // =====================================================
  // LOGIN FORM
  // =====================================================

  loginForm!: FormGroup;


  // =====================================================
  // FORM STATUS
  // =====================================================

  submitted = false;

  loading = false;

  loginError = '';


  constructor(
    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router
  ) {}


  // =====================================================
  // INITIALIZE FORM
  // =====================================================

  ngOnInit(): void {

    this.loginForm =
      this.fb.group({

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
  // EMAIL GETTER
  // =====================================================

  get email() {

    return this.loginForm.get(
      'email'
    );

  }


  // =====================================================
  // PASSWORD GETTER
  // =====================================================

  get password() {

    return this.loginForm.get(
      'password'
    );

  }


  // =====================================================
  // LOGIN
  // =====================================================

  onLogin(): void {

    this.submitted = true;

    this.loginError = '';


    // ===================================================
    // VALIDATION
    // ===================================================

    if (
      this.loginForm.invalid
    ) {

      this.loginForm.markAllAsTouched();

      return;

    }


    // ===================================================
    // LOADING START
    // ===================================================

    this.loading = true;


    // ===================================================
    // LOGIN DATA
    // ===================================================

    const loginData = {

      email:
        this.loginForm.value.email,

      password:
        this.loginForm.value.password

    };


    console.log(
      'LOGIN REQUEST:',
      loginData
    );


    // ===================================================
    // LOGIN API
    // ===================================================

    this.authService
      .login(loginData)
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (
          response: LoginResponse
        ) => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );


          // ===============================================
          // LOADING STOP
          // ===============================================

          this.loading = false;


          // ===============================================
          // GET ACCESS FLAGS
          // ===============================================

          const isAdmin =
            response.admin === true;


          const isEmployee =
            response.employee === true;


          console.log(
            'Admin Access:',
            isAdmin
          );


          console.log(
            'Employee Access:',
            isEmployee
          );


          // ===============================================
          // NO ROLE ASSIGNED
          // ===============================================
          //
          // User logged in successfully
          // but Admin and Employee access nahi hai
          //
          // Redirect to Viewer
          // ===============================================

          if (
            !isAdmin &&
            !isEmployee
          ) {

            this.router.navigate([
              '/viewer/dashboard'
            ]);

            return;

          }


          // ===============================================
          // USER HAS ROLE
          // ===============================================
          //
          // Admin OR Employee OR Both
          //
          // Go to Role Selection
          // ===============================================

          this.router.navigate([
            '/role-selection'
          ]);

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error) => {

          console.error(
            'Login error:',
            error
          );


          // ===============================================
          // LOADING STOP
          // ===============================================

          this.loading = false;


          // ===============================================
          // ERROR MESSAGE
          // ===============================================

          this.loginError =
            error?.error?.message ||
            error?.error?.responseMessage ||
            'Invalid email or password.';

        }

      });

  }


  // =====================================================
  // GO TO SIGNUP
  // =====================================================

  goToSignup(): void {

    this.router.navigate([
      '/signup'
    ]);

  }

}