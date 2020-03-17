import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../../../model/RigaMenuModel';
import { DataService } from '../../../../../shared/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  valueFromDS: string;
  Menu: Menu[];

  constructor(public DS: DataService) {

    this.DS.Menu.subscribe(
      (value) =>  {
        this.Menu = this.DS.VociMenu;
        console.log('NAVBAR MENU : ' + this.Menu);
      }
    );
  }

  ngOnInit() {
    console.log('NAVBAR COMPONENT INIT');
  }

}
