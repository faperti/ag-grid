import { Component, OnInit, Input } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from 'src/app/model/SearchCriteriaRiassegnazioni';
import { HttpClient } from '@angular/common/http';
import { ImportaRiassegnazioniContainerDataService } from './services/importa-riassegnazioni-data.service';
import { Dettaglio, ImportaVariazioni } from './model/importaVariazioni';

@Component({
  selector: 'app-importa-riassegnazioni-container',
  templateUrl: './importa-riassegnazioni-container.component.html',
  styleUrls: ['./importa-riassegnazioni-container.component.scss']
})
export class ImportaRiassegnazioniContainerComponent implements OnInit {

  private urlString = '';
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  // tslint:disable-next-line:no-any
  rowData: any[];
  emptyData: boolean;
  showGrid: boolean;
  dettagliImportazione: Dettaglio[];

  constructor( private http: HttpClient, private rcds: ImportaRiassegnazioniContainerDataService ) {
    this.emptyData = true;
    this.showGrid = false;
    this.dettagliImportazione = [];
  }

  ngOnInit() {
  }

  loadData(inpCriteria: SearchCriteriaRiassegnazioni) {

    console.log('LOAD DATA CONTAINER RIASSEGNAZIONI');

    // tslint:disable-next-line:max-line-length
    this.urlString = 'http://localhost:4518/api/RiAssegnazioniSMEA?';
    this.urlString = this.urlString + 'data_da=' + inpCriteria.DataStart;
    this.urlString = this.urlString + '&data_a=' + inpCriteria.DataEnd;
    this.urlString = this.urlString + '&commessa=' + inpCriteria.Commessa;
    // this.urlString = this.urlString + '&elaborato=' + inpCriteria.Elaborato;

    console.log(this.urlString);

    this.http.get(this.urlString)
        .subscribe(data => {
          this.rowDataLoaded = data;
          if ( this.rowDataLoaded.length > 0 ) {
              this.rowData = this.rowDataLoaded;
              this.emptyData = false;
              this.showGrid = true;
              console.log('load data 1: ' + this.emptyData);
            } else {
              this.emptyData = true;
              this.showGrid = false;
              this.rowData = [];
              console.log('load data 2: ' + this.emptyData);
            }
        });
}

updateGrid(value: SearchCriteriaRiassegnazioni) {
  this.loadData(value);
}

impVariazioni(value: string[]) {
  console.log('IMPORTA VARIAZIONI CONTAINER : ' + value);
  this.rcds.importaRiassegnazioni(value).subscribe( val => {
    const res = val as ImportaVariazioni;
    console.log(res.dettagli);
    this.dettagliImportazione = res.dettagli;
  }
    );
}



}
