import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchComponentComponent } from './shared/components/search-shared/search-shared.component';
import 'ag-grid-enterprise';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




// tslint:disable-next-line:component-class-suffix
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
      document.getElementById('preloader').classList.add('hide');
  }

}
