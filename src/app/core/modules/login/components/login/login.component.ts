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
  @Input() isLoading: boolean;
  @Output() login = new EventEmitter<LoginData>();

  public username: string;
  public password: string;
  private accessToken: string;

  constructor(  ) {
    this.accessToken = '';
    this.isLoading = false;
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

    this.isLoading = true;
    // this.loading = true;

    this.login.emit(creds);
  }

  clickOff() {
    this.isLoading = false;
  }


  // login(userName: string, password: string): Observable<BearerParams> {
  //   const headersForTokenAPI = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   const data = 'grant_type=password&username=' + this.userName + '&password=' + this.password;

  //   return this.http.post<BearerParams>(this.TokenAPI, data, { headers : headersForTokenAPI } );

  // }
}
