import { Component, OnInit, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { TestContainerDataService } from './services/test-container-data.service';

@Component({
  selector: 'app-test-container',
  templateUrl: './test-container.component.html'
})
export class TestContainerComponent implements OnInit {

  constructor(private http: HttpClient, private ds: DataService, public rs: TestContainerDataService) {
  }

  ngOnInit() {
    console.log('NG INIT TEST CONTAINER');
    this.updateTest();
  }

  updateTest() {
    this.rs.getTestWithToken('12345', '12345')
      .subscribe(data => {
        alert('subscribe!!');
      });
  }
}
