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


  if (!token || token.trim() === '') {

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
  // ADMIN ROUTE
  // =====================================================

  if (requiredRole === 'ADMIN') {

    if (isAdmin) {

      return true;

    }

    // User has no Admin access
    // but may have Employee access

    if (isEmployee) {

      return router.createUrlTree([
        '/employee/dashboard'
      ]);

    }

    return router.createUrlTree([
      '/login'
    ]);

  }


  // =====================================================
  // EMPLOYEE ROUTE
  // =====================================================

  if (requiredRole === 'EMPLOYEE') {

    if (isEmployee) {

      return true;

    }

    // User has no Employee access
    // but may have Admin access

    if (isAdmin) {

      return router.createUrlTree([
        '/admin/dashboard'
      ]);

    }

    return router.createUrlTree([
      '/login'
    ]);

  }


  // =====================================================
  // UNKNOWN ROLE
  // =====================================================

  return router.createUrlTree([
    '/login'
  ]);

};