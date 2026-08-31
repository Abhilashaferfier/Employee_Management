import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  inject
} from '@angular/core';


export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  // =====================================================
  // GET TOKEN
  // =====================================================

  const token =
    localStorage.getItem('token');


  // =====================================================
  // TOKEN CHECK
  // =====================================================

  if (token && token.trim() !== '') {

    return true;

  }


  // =====================================================
  // NO TOKEN
  // =====================================================

  return router.createUrlTree([
    '/login'
  ]);

};