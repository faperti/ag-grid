import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthDataService } from '../shared/services/AuthData.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public ADS: AuthDataService, private router: Router) {

  }


  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean  {

  const url: string = state.url;

  let result = false;

  result =  this.ADS.IsLogged() && this.checkLogin(url);
  if ( !result ) {
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  return result;


  }

  checkLogin(url: string) {
    console.log('CHECK LOGIN');
    console.log(url);
    if (this.ADS.Check(url)) {
      return true;
    } else {
      return false;
    }
  }
}
