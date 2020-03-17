import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { DataService } from './shared/services/data.service';

@Injectable()
export class AuthDataService {

  constructor(private ds: DataService) {
    // this.accessToken = '';
  }

  Check(menu: string): boolean {

    let result = false;

    if ( this.ds.VociMenu !== null && this.ds.VociMenu !== undefined ) {

      this.ds.VociMenu.forEach( x => {
        if (x.VociMenu.filter(voce => voce.Routing.toUpperCase() === menu.toUpperCase()).length === 1) {
          result = true;
        }
      });
      }

    // console.log('RESULT : ' + result);

    return result;
    }
  }
