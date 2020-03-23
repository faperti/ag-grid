import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthDataService } from '../shared/services/AuthData.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthDataService, private router: Router) {

  }


  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean  {

  const url: string = state.url;

  return this.checkLogin(url);

  }

  checkLogin(url: string) {
    console.log('CHECK LOGIN');
    console.log(url);
    if (this.auth.Check(url)) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
