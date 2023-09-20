import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // TODO: this.authService.isAuthorised$.pipe(map())
    if (this.authService.isAuthorised) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
