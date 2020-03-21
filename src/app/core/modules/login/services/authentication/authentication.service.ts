import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BearerParams } from 'src/app/model/BearerParams';

@Injectable()
export class AuthenticationService {

  private TokenAPI = 'http://localhost:4518/token';
  private GetMenuAPI = 'http://localhost:4518/api/menu';

  constructor( private http: HttpClient ) { }

  login(userName: string, password: string): Observable<BearerParams> {
    const headersForTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const data = 'grant_type=password&username=' + userName + '&password=' + password;

    return this.http.post<BearerParams>(this.TokenAPI, data, { headers : headersForTokenAPI } );

  }

  getMenu(token): Observable<any> {

    console.log('GET MENU');
    console.log('TOJEN ' + token);

    // tslint:disable-next-line:object-literal-key-quotes
    const headersAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.post<any>(this.GetMenuAPI, { headers : headersAPI } );

  }
}
