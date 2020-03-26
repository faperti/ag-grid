import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../../model/navbar/RigaMenuModel';
import { DataService } from '../../../../../shared/services/data.service';
import { AuthenticationService } from '../../../login/services/authentication/authentication.service';
import { ProfiloUtenteModel } from 'src/app/model/navbar/ProfiloUtenteModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  valueFromDS: string;
  Menu: Menu[];
  ProfiloUtente: ProfiloUtenteModel;



  loading: boolean;

  constructor(public DS: DataService,
              public AS: AuthenticationService,
              private router: Router) {
    // this.DS.Menu.subscribe(
    //   (value) =>  {
    //     // this.Menu = this.DS.VociMenu;
    //     // console.log('NAVBAR MENU : ' + this.Menu);
    //     console.log('NAVBAR TOKEN : ' + this.DS.getAccessToken() );
    //   }
    // );
  }

  ngOnInit() {
    // console.log('NAVBAR COMPONENT INIT');
    // console.log('NAVBAR TOKEN : ' + this.DS.getAccessToken() );

    this.loading = false;

    this.AS.getMenu(this.DS.getAccessToken())
      .subscribe( data => {
        this.Menu = data.ElencoMenu;
        this.ProfiloUtente = data.Profilo;
        this.DS.ElencoMenu = data.ElencoMenu;
        this.DS.ProfiloUtente = data.Profilo;

        console.log(data);

        this.loading = true;
        // console.log(value);
      });
  }

  logout() {
    this.DS.setAccessToken(null);
    this.loading = false;
    this.Menu = null;
    this.ProfiloUtente = null;
    this.DS.ElencoMenu = null;
    this.DS.ProfiloUtente = null;
    this.router.navigate(['login']);
  }

}
