import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const isUserExist = localStorage.getItem('user');

  if (isUserExist) return true;

  const router = inject(Router);
  router.navigate(['login']);
  return false;
};
