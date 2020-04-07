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
  @Input() rowData: any[];
  @Input() statoData: any[];
  @Input() formeData: any[];
  @Input() legheData: any[];
  @Input() presseData: any[];
  @Input() statiCicloData: any[];
  @Input() statiFisiciData: any[];

  @Output() search: EventEmitter<SearchCriteria> = new EventEmitter<SearchCriteria>();
  @Output() noLoading = new EventEmitter<any>();
  // @Output() login = new EventEmitter<LoginData>();

  private myValue: number;
  private lottoToChild: string;
  private urlString: string;
  private criteriaToGrid: SearchCriteria;
  private updates: number;
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

  //   this.updatesToSend = [];
  //   this.updates = value.length;

  //   value.forEach(element => {

  //     const current = { lotto: element, commessa: ''};
  //     this.updatesToSend.push(current);

  //   });

  //   console.log('PARENT 1 TOKEN : ' + this.ds.getAccessToken());

  //   let headers = new HttpHeaders().set('Content-type', 'application/json');
  //   headers = headers.set('Authorization', 'Bearer ' + this.ds.accessToken);

  //   const body = {
  //                       body: this.updatesToSend
  //                };

  //   console.log('PARENT1 HEADERS ' + headers);

  //   // this.http.post('http://localhost:4518/api/test/resource1', null , { headers } )
  //   //   .subscribe( res => {
  //   //     alert(res);
  //   //   },
  //   //   error => {
  //   //     alert('Visualizzazione non disponibile');
  //   //   }
  //   //   );

  //   this.http.post<GenerateCertsResult>('http://localhost:4518/api/Stampe', this.updatesToSend, {headers} )
  //     .subscribe(res => {
  //       alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
  // },
  // error => {
  //   alert('Visualizzazione non disponibile');
  // });
}
}
