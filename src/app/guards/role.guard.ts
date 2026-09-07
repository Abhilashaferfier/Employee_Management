import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  inject
} from '@angular/core';


export const roleGuard: CanActivateFn = (
  route
) => {

  const router = inject(Router);


  // =====================================================
  // TOKEN CHECK
  // =====================================================

  const token =
    localStorage.getItem('token');


  // User is not logged in
  // Redirect to Login

  if (
    !token ||
    token.trim() === ''
  ) {

    return router.createUrlTree([
      '/login'
    ]);

  }


  // =====================================================
  // REQUIRED ROLE
  // =====================================================

  const requiredRole =
    String(
      route.data['role'] || ''
    ).toUpperCase();


  // =====================================================
  // USER ACCESS
  // =====================================================

  const isAdmin =
    localStorage.getItem('admin') === 'true';


  const isEmployee =
    localStorage.getItem('employee') === 'true';


  // =====================================================
  // ADMIN ACCESS
  // =====================================================

  if (requiredRole === 'ADMIN') {

    // User has Admin access

    if (isAdmin) {

      return true;

    }


    // User does not have Admin access
    // Viewer is the default dashboard

    return router.createUrlTree([
      '/viewer/dashboard'
    ]);

  }


  // =====================================================
  // EMPLOYEE ACCESS
  // =====================================================

  if (requiredRole === 'EMPLOYEE') {

    // User has Employee access

    if (isEmployee) {

      return true;

    }


    // User does not have Employee access
    // Viewer is the default dashboard

    return router.createUrlTree([
      '/viewer/dashboard'
    ]);

  }


  // =====================================================
  // INVALID / UNKNOWN ROLE
  // =====================================================

  return router.createUrlTree([
    '/viewer/dashboard'
  ]);

};