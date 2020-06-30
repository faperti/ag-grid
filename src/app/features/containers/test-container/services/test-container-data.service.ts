import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';

@Injectable()
export class TestContainerDataService {

  private baseUrlString = '';
  lastSearchCriteria: SearchCriteria;

  constructor( private http: HttpClient, private DS: DataService, private cs: CommonService ) {
    // this.accessToken = '';
    this.baseUrlString = this.cs.baseUrl;
  }

  // tslint:disable-next-line:no-any
    getTestWithToken(lotto: string, normativa: string): any {

      console.log('getCollaudoWithToken');

      // tslint:disable-next-line:object-literal-shorthand
      const body = { lotto: lotto, normativa: normativa };
      console.log(body);

      // const urlString = this.baseUrlString +  'ProveCollaudoReport?lotto=' + lotto + '&normativa=' + normativa;
      const urlString = this.baseUrlString +  '/Test';

      // tslint:disable-next-line:max-line-length
      return this.http.post(urlString, body , { headers : { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.DS.getAccessToken() } } );

    }
  }
