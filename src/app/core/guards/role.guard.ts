import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const userRole = localStorage.getItem('role');

  const requiredRole = route.data['role'];

  if (userRole === requiredRole) {
    return true;
  }

  if (userRole === 'ADMIN') {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/employee/dashboard']);
  }

  return false;
};
