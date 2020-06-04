import { Component, OnInit, Input } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from 'src/app/model/SearchCriteriaRiassegnazioni';
import { HttpClient } from '@angular/common/http';

// import { Dettaglio, ImportaVariazioni } from './model/importaVariazioni';
import { CodaStampaContainerDataService } from './services/coda-stampa-container-data.service';
import { SearchCriteriaCodaGenerazioneCertificati } from 'src/app/model/SearchCriteriaCodaGenerazioneCertificati';

@Component({
  selector: 'app-coda-stampa-container',
  templateUrl: './coda-stampa-container.component.html',
  styleUrls: ['./coda-stampa-container.component.scss']
})
export class CodaStampaContainerComponent implements OnInit {

  private urlString = '';
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  // tslint:disable-next-line:no-any
  rowData: any[];
  emptyData: boolean;
  showGrid: boolean;
    // tslint:disable-next-line:no-any
  resultAccodaStampe: any[];

  constructor( private http: HttpClient, private cscds: CodaStampaContainerDataService ) {
    this.emptyData = true;
    this.showGrid = false;
  }

  ngOnInit() {
  }

  loadData(inpCriteria: SearchCriteriaCodaGenerazioneCertificati) {

    console.log('LOAD DATA CODA STAMPA CONTAINER');

    this.cscds.GetCodaGenerazione(inpCriteria.DataStart, inpCriteria.DataEnd, inpCriteria.Tipo)
        .subscribe(data => {
          this.rowDataLoaded = data;
          if ( this.rowDataLoaded.length > 0 ) {
              this.rowData = this.rowDataLoaded;
              this.resultAccodaStampe = null;
              this.emptyData = false;
              this.showGrid = true;
              console.log('load data 1: ' + this.emptyData);
            } else {
              this.emptyData = true;
              this.showGrid = false;
              this.resultAccodaStampe = null;
              this.rowData = [];
              console.log('load data 2: ' + this.emptyData);
            }
        });
}

updateGrid(value: SearchCriteriaCodaGenerazioneCertificati) {
  this.loadData(value);
}

importGenerazioni(value: number[]) {
  console.log('IMPORTA VARIAZIONI CONTAINER : ' + value);

  this.cscds.importGenerazioni(value).subscribe( val => {
    console.log(val);
    this.resultAccodaStampe = val;
  }
  );
  // this.cscds.importaRiassegnazioni(value).subscribe( val => {
  //   const res = val as ImportaVariazioni;
  //   console.log(res.dettagli);
  //   this.dettagliImportazione = res.dettagli;
  // }
  // );
}



}
