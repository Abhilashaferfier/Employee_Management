import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

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


  loginForm!: FormGroup;

  submitted = false;

  loading = false;

  loginError = '';


  constructor(
    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router
  ) {}


  // ======================================================
  // INITIALIZE FORM
  // ======================================================

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


  // ======================================================
  // GETTERS
  // ======================================================

  get email() {

    return this.loginForm.get(
      'email'
    );

  }


  get password() {

    return this.loginForm.get(
      'password'
    );

  }


  // ======================================================
  // LOGIN
  // ======================================================

  onLogin(): void {

    this.submitted = true;

    this.loginError = '';


    // ====================================================
    // VALIDATION
    // ====================================================

    if (
      this.loginForm.invalid
    ) {

      this.loginForm.markAllAsTouched();

      return;

    }


    this.loading = true;


    // ====================================================
    // LOGIN DATA
    // ====================================================

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


    // ====================================================
    // API CALL
    // ====================================================

    this.authService
      .login(loginData)
      .subscribe({

        // ==================================================
        // SUCCESS
        // ==================================================

        next: (
          response: LoginResponse
        ) => {

          console.log(
            'LOGIN RESPONSE:',
            response
          );


          this.loading = false;


          // =================================================
          // GET ACCESS FLAGS
          // =================================================

          const isAdmin =
            response.admin === true;

          const isEmployee =
            response.employee === true;


          console.log(
            'Admin:',
            isAdmin
          );


          console.log(
            'Employee:',
            isEmployee
          );


          // =================================================
          // BOTH ADMIN + EMPLOYEE
          // =================================================

          if (
            isAdmin &&
            isEmployee
          ) {

            /*
             * User ke paas dono roles hain.
             *
             * Role selection page par jayega.
             *
             * IMPORTANT:
             * Route = /role-selection
             */

            this.router.navigate([
              '/role-selection'
            ]);

            return;

          }


          // =================================================
          // ONLY ADMIN
          // =================================================

          if (
            isAdmin &&
            !isEmployee
          ) {

            localStorage.setItem(
              'selectedRole',
              'ADMIN'
            );


            this.router.navigate([
              '/admin/dashboard'
            ]);

            return;

          }


          // =================================================
          // ONLY EMPLOYEE
          // =================================================

          if (
            !isAdmin &&
            isEmployee
          ) {

            localStorage.setItem(
              'selectedRole',
              'EMPLOYEE'
            );


            this.router.navigate([
              '/employee/dashboard'
            ]);

            return;

          }


          // =================================================
          // NO ROLE
          // =================================================

          this.loginError =
            'No access role has been assigned to this user.';

        },


        // ==================================================
        // ERROR
        // ==================================================

        error: (error) => {

          console.error(
            'Login error:',
            error
          );


          this.loading = false;


          this.loginError =
            error?.error?.message ||
            error?.error?.responseMessage ||
            'Invalid email or password.';

        }

      });

  }


  // ======================================================
  // GO TO SIGNUP
  // ======================================================

  goToSignup(): void {

    this.router.navigate([
      '/signup'
    ]);

  }

}