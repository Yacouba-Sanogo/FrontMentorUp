import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // L'utilisateur est connecté, il peut accéder à la page
      } else {
        // L'utilisateur n'est pas connecté, on le redirige vers la page de connexion
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};