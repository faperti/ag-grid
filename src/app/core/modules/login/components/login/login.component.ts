import { Component, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoginData } from '../../models/login-data';


// prova SCM

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('formLogin', { static: false } ) loginField: ElementRef;
  // @ViewChildren('#test') loginFields: QueryList<ElementRef>;

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

  ngAfterViewInit() {
    (this.loginField.nativeElement as HTMLInputElement).focus();
    // console.log('test');
  }

    // test(e) {
    // const newFormData = new FormData();
    // const file = (e.target as HTMLInputElement).files[0] as File;
    // newFormData.append('file', file, file.name);
    // console.log(newFormData);
    // }

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
