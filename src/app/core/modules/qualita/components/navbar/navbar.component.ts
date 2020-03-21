import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../../model/RigaMenuModel';
import { DataService } from '../../../../../shared/services/data.service';
import { AuthenticationService } from '../../../login/services/authentication/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  valueFromDS: string;
  Menu: Menu[];

  constructor(public DS: DataService, public AS: AuthenticationService) {
    // this.DS.Menu.subscribe(
    //   (value) =>  {
    //     // this.Menu = this.DS.VociMenu;
    //     // console.log('NAVBAR MENU : ' + this.Menu);
    //     console.log('NAVBAR TOKEN : ' + this.DS.getAccessToken() );
    //   }
    // );
  }

  ngOnInit() {
    console.log('NAVBAR COMPONENT INIT');

    console.log('NAVBAR TOKEN : ' + this.DS.getAccessToken() );

    this.AS.getMenu(this.DS.getAccessToken())
    .subscribe( value => {
      console.log(value);
    });
  }

}
