import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BearerParams } from 'src/app/model/BearerParams';
import { NavbarModel } from 'src/app/model/navbar/NavbarModel';
import { CommonService } from 'src/app/shared/services/common.service';


@Injectable()
export class AuthenticationService {

  // private TokenAPI = 'http://localhost:4518/token';
  // private GetMenuAPI = 'http://localhost:4518/api/menu';

  private GetMenuAPI = this.commonService.baseUrl + '/menu';
  private TokenAPI = this.commonService.baseUrlToken;


  constructor( private http: HttpClient, private commonService: CommonService ) { }

  login(userName: string, password: string): Observable<BearerParams> {
  // login(userName: string, password: string): any {

    console.log('LOGIN : ');
    console.log(this.TokenAPI);

    const headersForTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const data = 'grant_type=password&username=' + userName + '&password=' + password;

    return this.http.post<BearerParams>(this.TokenAPI, data, { headers : headersForTokenAPI } );
  }

  getMenu(token): Observable<NavbarModel> {

    // const bodyValues = { username: userNameParameter, password: passwordParameter };

    // tslint:disable-next-line:object-literal-key-quotes
    const headersAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Bearer "' + token + '"'});
    return this.http.post<NavbarModel>(this.GetMenuAPI, null , { headers : { 'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token } } );

  }
}
