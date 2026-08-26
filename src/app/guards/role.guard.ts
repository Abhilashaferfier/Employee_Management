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

  const router =
    inject(Router);


  // ======================================================
  // REQUIRED ROLE
  // ======================================================

  const requiredRole =
    String(
      route.data['role'] || ''
    ).toUpperCase();


  // ======================================================
  // GET ACCESS FLAGS
  // ======================================================

  const isAdmin =
    localStorage.getItem('admin') === 'true';

  const isEmployee =
    localStorage.getItem('employee') === 'true';


  // ======================================================
  // ADMIN ROUTE
  // ======================================================

  if (
    requiredRole === 'ADMIN'
  ) {

    if (isAdmin) {

      return true;

    }

  }


  // ======================================================
  // EMPLOYEE ROUTE
  // ======================================================

  if (
    requiredRole === 'EMPLOYEE'
  ) {

    if (isEmployee) {

      return true;

    }

  }


  // ======================================================
  // BOTH ROLES
  // ======================================================

  if (
    isAdmin &&
    isEmployee
  ) {

    return router.createUrlTree([
      '/select-role'
    ]);

  }


  // ======================================================
  // ADMIN ONLY
  // ======================================================

  if (isAdmin) {

    return router.createUrlTree([
      '/admin/dashboard'
    ]);

  }


  // ======================================================
  // EMPLOYEE ONLY
  // ======================================================

  if (isEmployee) {

    return router.createUrlTree([
      '/employee/dashboard'
    ]);

  }


  // ======================================================
  // NO ACCESS
  // ======================================================

  return router.createUrlTree([
    '/login'
  ]);

};