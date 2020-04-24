import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchCriteria } from '../../../model/searchCriteria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerateCertsResult } from '../../../model/GenerateCertsResult';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.scss']
})
export class Parent1Component implements OnInit {

  @Input() inpCriteria: SearchCriteria;
  @Input() showGrid: boolean;
  @Input() emptyData: boolean;
  // tslint:disable-next-line:no-any
  @Input() rowData: any[];
  // tslint:disable-next-line:no-any
  @Input() statoData: any[];
  // tslint:disable-next-line:no-any
  @Input() formeData: any[];
  // tslint:disable-next-line:no-any
  @Input() legheData: any[];
  // tslint:disable-next-line:no-any
  @Input() presseData: any[];
  // tslint:disable-next-line:no-any
  @Input() statiCicloData: any[];
  // tslint:disable-next-line:no-any
  @Input() statiFisiciData: any[];

  @Output() search: EventEmitter<SearchCriteria> = new EventEmitter<SearchCriteria>();
  // tslint:disable-next-line:no-any
  @Output() noLoading = new EventEmitter<any>();
  // @Output() login = new EventEmitter<LoginData>();

  private myValue: number;
  private lottoToChild: string;
  private urlString: string;
  criteriaToGrid: SearchCriteria;
  private updates: number;
  // tslint:disable-next-line:no-any
  private updatesToSend: any[];

  constructor( public ds: DataService, private http: HttpClient, private router: Router ) {

    // console.log('PARENT1 ACCESS TOKEN');
    // console.log(this.ds.getAccessToken());

  }

  ngOnInit() {
    this.myValue = 0;
    this.lottoToChild = '';
    this.showGrid = false;
  }

  updateMyGrid(value: SearchCriteria) {

    this.criteriaToGrid = value;
    this.showGrid = true;
    this.rowData = null;

    this.search.emit(this.criteriaToGrid);
    console.log(' post EMIT PARENT1 ');
  }

  stopLoading() {
    console.log('STOP LOADING PARENT 1' + new Date().toString() );
    // tslint:disable-next-line:only-arrow-functions
    setTimeout( function() { console.log('STOP LOADING PARENT 1' + new Date().toString() );  }, 5000);
    this.noLoading.emit(6);
  }

  generateCerts(value: string[]) {
    this.router.navigate(['/login']);
  }
  
}
