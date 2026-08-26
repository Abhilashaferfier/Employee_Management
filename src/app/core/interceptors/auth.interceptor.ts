import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import {
  catchError,
  tap,
  throwError
} from 'rxjs';


// ======================================================
// LOGIN RESPONSE
// ======================================================

interface LoginResponse {

  admin?: boolean;

  employee?: boolean;

  email?: string;

  token?: string;

  tokenType?: string;

  userId?: string;

}


// ======================================================
// AUTH INTERCEPTOR
// ======================================================

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const router = inject(Router);


  // ======================================================
  // AUTH REQUEST CHECK
  // ======================================================

  const isLoginRequest =
    req.url.includes('/auth/login');

  const isSignupRequest =
    req.url.includes('/auth/register');


  // ======================================================
  // LOGIN / SIGNUP REQUEST
  // ======================================================

  if (
    isLoginRequest ||
    isSignupRequest
  ) {

    return next(req).pipe(

      tap((event) => {

        // ==================================================
        // LOGIN SUCCESS
        // ==================================================

        if (
          isLoginRequest &&
          event instanceof HttpResponse
        ) {

          const body =
            event.body as LoginResponse;


          // ================================================
          // TOKEN
          // ================================================

          if (body?.token) {

            localStorage.setItem(
              'token',
              body.token
            );

          }


          // ================================================
          // USER ID
          // ================================================

          if (body?.userId) {

            localStorage.setItem(
              'userId',
              body.userId
            );

          }


          // ================================================
          // EMAIL
          // ================================================

          if (body?.email) {

            localStorage.setItem(
              'email',
              body.email
            );

          }


          // ================================================
          // ADMIN ACCESS
          // ================================================

          localStorage.setItem(
            'admin',
            String(body?.admin === true)
          );


          // ================================================
          // EMPLOYEE ACCESS
          // ================================================

          localStorage.setItem(
            'employee',
            String(body?.employee === true)
          );


          // ================================================
          // TOKEN TYPE
          // ================================================

          if (body?.tokenType) {

            localStorage.setItem(
              'tokenType',
              body.tokenType
            );

          }


          console.log(
            'ADMIN ACCESS:',
            body?.admin
          );

          console.log(
            'EMPLOYEE ACCESS:',
            body?.employee
          );

        }

      }),


      // ====================================================
      // ERROR
      // ====================================================

      catchError(
        (error: HttpErrorResponse) => {

          console.error(
            'Authentication API Error:',
            error
          );

          return throwError(
            () => error
          );

        }
      )

    );

  }


  // ======================================================
  // GET TOKEN
  // ======================================================

  const token =
    localStorage.getItem('token');


  // ======================================================
  // TOKEN AVAILABLE
  // ======================================================

  if (token) {

    const authReq = req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${token}`

      }

    });


    return next(authReq).pipe(

      catchError(
        (error: HttpErrorResponse) => {

          console.error(
            'API Error:',
            error
          );


          // ================================================
          // 401 UNAUTHORIZED
          // ================================================

          if (error.status === 401) {

            // Clear authentication

            localStorage.removeItem(
              'token'
            );

            localStorage.removeItem(
              'userId'
            );

            localStorage.removeItem(
              'email'
            );

            localStorage.removeItem(
              'admin'
            );

            localStorage.removeItem(
              'employee'
            );

            localStorage.removeItem(
              'tokenType'
            );

            localStorage.removeItem(
              'selectedRole'
            );


            router.navigate([
              '/login'
            ]);

          }


          return throwError(
            () => error
          );

        }
      )

    );

  }


  // ======================================================
  // NO TOKEN
  // ======================================================

  return next(req).pipe(

    catchError(
      (error: HttpErrorResponse) => {

        console.error(
          'API Error:',
          error
        );

        return throwError(
          () => error
        );

      }
    )

  );

};