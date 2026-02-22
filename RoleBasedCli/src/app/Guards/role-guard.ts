import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { routes } from '../app.routes';

export const roleGuard: CanActivateFn = () => {   //Checks if the user is logged in✅ If logged in → allows navigation❌ If NOT logged in → redirects to /login
  const auth = inject(AuthService);
  const router = inject(Router);

  if(auth.isLoggedIn())
    return true;

  router.navigate(['/login']);
  return false;
};