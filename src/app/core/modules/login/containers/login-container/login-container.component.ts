import { Component, OnInit } from '@angular/core';
import { BearerParams } from 'src/app/model/BearerParams';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../../models/login-data';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {
  private authParams: BearerParams;
  private TokenAPI: string;

  loading: boolean;
  errorLoading: string;

  // constructor( public ds: DataService, private authService: AuthenticationService, private router: Router, private http: HttpClient ) {
  //   this.accessToken = '';
  // }

  constructor( public ds: DataService, private authService: AuthenticationService, private router: Router, private http: HttpClient ) {
  }


  ngOnInit() {
  }

  doLogin(creds: LoginData) {
    this.errorLoading = '';
    this.loading = true;
    if ( creds.userName !== '' && creds.password !== '') {
      this.clickMe(creds.userName, creds.password);
    }

  }

  clickMe(username: string, password: string) {
    this.authService.login(username, password)
    .subscribe(
      data => {
        // console.log(data.access_token);
        this.ds.setAccessToken(data.access_token);

        // this.ds.setMenu(data.Menu);
        // console.log('MENU : ' + data.Menu );
        this.loading = false;
        this.router.navigate(['/qualita']);
    }, error => {
      // console.log('ERROR clickME ' + error);
      this.errorLoading = 'errore in fase di autenticazione';
      this.loading = false;
      // this.ds.accessToken = '';
      }
      );
  }

}
