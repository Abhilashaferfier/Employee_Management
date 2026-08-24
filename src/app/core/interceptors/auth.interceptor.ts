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


// ==========================================
// LOGIN RESPONSE
// Backend ka actual response
// ==========================================

interface LoginResponse {
  email?: string;
  role?: string;
  token?: string;
  tokenType?: string;
  userId?: string;
}


// ==========================================
// AUTH INTERCEPTOR
// ==========================================

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);


  // ==========================================
  // CHECK AUTH REQUEST
  // ==========================================

  const isLoginRequest =
    req.url.includes('/auth/login');

  const isSignupRequest =
    req.url.includes('/auth/register');


  // ==========================================
  // LOGIN / SIGNUP REQUEST
  //
  // In requests mein existing token attach
  // nahi karna.
  // ==========================================

  if (isLoginRequest || isSignupRequest) {

    return next(req).pipe(

      tap((event) => {

        // ======================================
        // LOGIN SUCCESS RESPONSE
        // ======================================

        if (
          isLoginRequest &&
          event instanceof HttpResponse
        ) {

          const body =
            event.body as LoginResponse;


          // ====================================
          // TOKEN
          // ====================================

          if (body?.token) {

            localStorage.setItem(
              'token',
              body.token
            );

            console.log(
              'Token saved in localStorage'
            );

          }


          // ====================================
          // USER ID
          // ====================================

          if (body?.userId) {

            localStorage.setItem(
              'userId',
              body.userId
            );

          }


          // ====================================
          // EMAIL
          // ====================================

          if (body?.email) {

            localStorage.setItem(
              'email',
              body.email
            );

          }


          // ====================================
          // ROLE
          // ====================================

          if (body?.role) {

            localStorage.setItem(
              'role',
              body.role
            );

          }


          // ====================================
          // TOKEN TYPE
          // ====================================

          if (body?.tokenType) {

            localStorage.setItem(
              'tokenType',
              body.tokenType
            );

          }

        }

      }),


      // ======================================
      // LOGIN / SIGNUP ERROR
      // ======================================

      catchError((error: HttpErrorResponse) => {

        console.error(
          'Authentication API Error:',
          error
        );

        return throwError(
          () => error
        );

      })

    );

  }


  // ==========================================
  // GET TOKEN FROM LOCAL STORAGE
  // ==========================================

  const token =
    localStorage.getItem('token');


  // ==========================================
  // TOKEN AVAILABLE
  // ==========================================

  if (token) {

    const authReq = req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${token}`

      }

    });


    console.log(
      'Authorization token attached to request'
    );


    return next(authReq).pipe(

      catchError((error: HttpErrorResponse) => {

        console.error(
          'API Error:',
          error
        );


        // ====================================
        // 401 UNAUTHORIZED
        // ====================================

        if (error.status === 401) {

          console.warn(
            'Token expired or invalid'
          );


          // Remove authentication data

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
            'role'
          );

          localStorage.removeItem(
            'tokenType'
          );


          // Redirect to login

          router.navigate([
            '/login'
          ]);

        }


        return throwError(
          () => error
        );

      })

    );

  }


  // ==========================================
  // NO TOKEN
  // ==========================================

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      console.error(
        'API Error:',
        error
      );

      return throwError(
        () => error
      );

    })

  );

};



// import {
//   HttpInterceptorFn,
//   HttpResponse,
//   HttpErrorResponse
// } from '@angular/common/http';

// import { catchError, tap, throwError } from 'rxjs';


// // ==========================================
// // LOGIN RESPONSE
// // ==========================================

// interface LoginResponse {
//   email?: string;
//   role?: string;
//   token?: string;
//   tokenType?: string;
//   userId?: string;
// }


// // ==========================================
// // AUTH INTERCEPTOR
// // ==========================================

// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   // ==========================================
//   // CHECK AUTH REQUEST
//   // ==========================================

//   const isLoginRequest =
//     req.url.includes('/auth/login');

//   const isSignupRequest =
//     req.url.includes('/auth/register');


//   // ==========================================
//   // LOGIN / SIGNUP REQUEST
//   // ==========================================

//   if (isLoginRequest || isSignupRequest) {

//     return next(req).pipe(

//       tap((event) => {

//         // ======================================
//         // LOGIN SUCCESS
//         // ======================================

//         if (
//           isLoginRequest &&
//           event instanceof HttpResponse
//         ) {

//           const body =
//             event.body as LoginResponse;


//           // TOKEN
//           if (body?.token) {

//             localStorage.setItem(
//               'token',
//               body.token
//             );

//             console.log(
//               'Token saved in localStorage'
//             );
//           }


//           // USER ID
//           if (body?.userId) {

//             localStorage.setItem(
//               'userId',
//               body.userId
//             );
//           }


//           // EMAIL
//           if (body?.email) {

//             localStorage.setItem(
//               'email',
//               body.email
//             );
//           }


//           // ROLE
//           if (body?.role) {

//             localStorage.setItem(
//               'role',
//               body.role
//             );
//           }


//           // TOKEN TYPE
//           if (body?.tokenType) {

//             localStorage.setItem(
//               'tokenType',
//               body.tokenType
//             );
//           }

//         }

//       }),

//       catchError((error: HttpErrorResponse) => {

//         console.error(
//           'Authentication API Error:',
//           error
//         );

//         return throwError(
//           () => error
//         );

//       })

//     );

//   }


//   // ==========================================
//   // GET TOKEN
//   // ==========================================

//   const token =
//     localStorage.getItem('token');


//   // ==========================================
//   // TOKEN AVAILABLE
//   // ==========================================

//   if (token) {

//     const authReq = req.clone({

//       setHeaders: {

//         Authorization:
//           `Bearer ${token}`

//       }

//     });


//     console.log(
//       'Authorization token attached to request'
//     );


//     return next(authReq).pipe(

//       catchError((error: HttpErrorResponse) => {

//         console.error(
//           'API Error:',
//           error
//         );

//         // ====================================
//         // IMPORTANT
//         // ====================================
//         // Abhi automatic logout nahi karna.
//         // Future protected APIs integrate hone
//         // ke baad yahan 401 handling karenge.

//         return throwError(
//           () => error
//         );

//       })

//     );

//   }


//   // ==========================================
//   // NO TOKEN
//   // ==========================================

//   return next(req).pipe(

//     catchError((error: HttpErrorResponse) => {

//       console.error(
//         'API Error:',
//         error
//       );

//       return throwError(
//         () => error
//       );

//     })

//   );

// };