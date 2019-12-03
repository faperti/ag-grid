import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchComponentComponent } from './search-component/search-component.component';
import 'ag-grid-enterprise';
import { DataService } from './data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ DataService ]
})




// tslint:disable-next-line:component-class-suffix
export class AppComponent {

}
