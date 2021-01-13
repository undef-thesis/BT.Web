import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public flag: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.isLoggedIn.subscribe((response) => {
      this.flag = response;
    });

    if (this.flag) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
