import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginData } from '../../models/login-data';


// prova SCM

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() errorLoading: string;
  @Output() login = new EventEmitter<LoginData>();

  private username: string;
  private password: string;
  private accessToken: string;
  private loading: boolean;

  constructor(  ) {
    this.accessToken = '';
  }

  ngOnInit() {
    // console.log('INIT!');
  }

  clickMe() {
    console.log('CLICK ME');

    // this.password;
    const creds: LoginData = new LoginData();
    creds.userName = this.username;
    creds.password = this.password;

    // this.loading = true;

    this.login.emit(creds);
  }

  clickOff() {
    this.loading = false;
  }


  // login(userName: string, password: string): Observable<BearerParams> {
  //   const headersForTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const data = 'grant_type=password&username=' + this.userName + '&password=' + this.password;

  //   return this.http.post<BearerParams>(this.TokenAPI, data, { headers : headersForTokenAPI } );

  // }
}
