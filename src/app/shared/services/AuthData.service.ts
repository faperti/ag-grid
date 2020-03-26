import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { DataService } from './data.service';

@Injectable()
export class AuthDataService {

  constructor(public ds: DataService  ) {
    // this.accessToken = '';
  }

  IsLogged(): boolean {
    let result = false;

    if ( this.ds.getAccessToken() ) {
      result = true;
      console.log('GET ACCESS TOKEN TRUE');
    } else {
      console.log('GET ACCESS TOKEN FALSE');
    }

    return result;
  }


  Check(menu: string): boolean {

    console.log('CHECK MENU');
    console.log(menu);

    let result = false;

    if ( this.ds.ElencoMenu !== null && this.ds.ElencoMenu !== undefined ) {
       this.ds.ElencoMenu.forEach( x => {

          console.log(x.VociMenu);

          if (x.VociMenu.filter(voce => voce.Routing.toUpperCase() === menu.toUpperCase()).length === 1) {
            result = true;
          }
        });
       } else {
      result = true;
      console.log('ELSE CHECK');
    }

    return result;
    }
  }
