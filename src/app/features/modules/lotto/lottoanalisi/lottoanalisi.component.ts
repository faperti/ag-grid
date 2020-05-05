import { Component, OnInit, Output, Input } from '@angular/core';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { HeaderGridComponent } from 'src/app/features/modules/lotto/header-grid-component/header-grid-component.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AccodaGenerazioneCertificatoRendererComponent } from 'src/app/renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';
import { AccodaGenerazioneProvaModel } from 'src/app/renderers/model/accoda-generazione-prova-model';
import { getCurrencySymbol } from '@angular/common';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { LottoDataService } from '../lotto-data.service';

@Component({
  selector: 'app-lottoanalisi',
  templateUrl: './lottoanalisi.component.html',
  styleUrls: ['./lottoanalisi.component.scss']
})
// export class LottoanalisiComponent implements OnInit {
export class LottoanalisiComponent extends BaseLottoView implements OnInit {

  @Input() lotto: string;
  // @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  normativaSelezionata: string;
  private currentPrescritta: string;
  Prescritte: string[];
  // tslint:disable-next-line:no-any
  columnDefs: any[];
  defaultColDef;
  // tslint:disable-next-line:no-any
  rowData: any[];
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  private message = '';
  private urlString = '';
  private lottiToGenerate: string[];
  private prove: string[];
  private proveSelezionate: string[];
  // tslint:disable-next-line:no-any
  frameworkComponents: any;
  context;
  private elementiCoda: AccodaGenerazioneModel[];
  // tslint:disable-next-line:no-any
  elaboratoFormatter: any;
  private overlayLoadingTemplate: string;
  private overlayNoRowsTemplate: string;
  showLoading: boolean;

  constructor(http: HttpClient,
              activatedRoute: ActivatedRoute,
              router: Router,
              dataservice: LottoDataService) {


    super(http, activatedRoute, dataservice);

    this.proveSelezionate = [];

    this.normativaSelezionata = 'EURAL';
    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom no rows overlay</span>';

    this.showLoading = true;

    this.initializeColumnsDefs();

    this.frameworkComponents = {
      accodaRenderer: AccodaGenerazioneCertificatoRendererComponent,
      agColumnHeader: HeaderGridComponent
    };

    this.context = { componentParent: this };
    this.defaultColDef = {
      sortable: true,
      filter: true
    };

  }

  initializeColumnsDefs() {

    this.columnDefs = [];

    this.columnDefs = [
      {
        headerName: 'Selezione',
        width: 100,
        headerCheckboxSelection: true,
        checkboxSelection: true
      },
      {
        headerName: 'Elemento',
        field: 'Elemento',
        width: 110
      }
    ];

  }


  updateGrid() {
    this.showLoading = true;
    // // tslint:disable-next-line:max-line-length
    // this.urlString = 'http://localhost:4518/api/ProveAnalisiReport?lotto=' + this.lotto + '&normativa=EURAL&bAlter=false';


    // this.http.get<any>(this.urlString)
    this.ds.GetAnalisi(this.lotto)
          .subscribe(data => {
            this.rowData = data.TabellaPrescritta;
            this.Prescritte = data.Prescritte;
            this.prove = data.Prove;

            console.log(this.rowData);
            console.log(this.Prescritte);
            console.log(this.prove);

            this.normativaSelezionata = data.NormativaSelezionata;

            this.columnDefs.push (
              {
                headerName: 'Valore minimo',
                field: 'PMin',
                width: 110
              }
            );

            this.columnDefs.push (
              {
                headerName: 'Valore massimo',
                field: 'PMax',
                width: 110
              }
            );

            this.columnDefs.push (
              {
                headerName: 'Analisi Colata',
                field: 'AnalisiColata',
                width: 110
              }
            );

            // // tslint:disable-next-line:only-arrow-functions
            this.prove.forEach( (value) => {
               // console.log(value);
               // console.log(params.data[value + '_colore']);
               this.columnDefs.push( {
                  headerName: 'Prova ' + value,
                  headerComponentParams: { showCheck: false, numeroProva: value },
                  field: value,
                  width: 110,
                  hide: false,
                  suppressMenu: true,
                  // tslint:disable-next-line:object-literal-shorthand
                  cellStyle: function(params) {
                    const valColore = value + '_colore';
                    return { backgroundColor: params.data[valColore] };
                }
              } );
             } );

          //   this.columnDefs.push ( {
          //     headerName: 'Eventi',
          //     resizable: false,
          //     cellRenderer: 'accodaRenderer',
          //     colId: 'params',
          //     width: 90
          // });

            // console.log(this.columnDefs);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.showLoading = false;

          });
}

calculateBackground(minValue: number, maxValue: number, value: number ): string {
  console.log('calculateBackground');
  console.log(minValue);
  console.log(maxValue);
  console.log(value);


  if ( minValue === null ) {
    minValue = -1;
  }

  if ( maxValue === null ) {
    maxValue = 101;
  }

  if ( value < minValue ) {
    return 'blue';
  }

  if ( value > maxValue ) {
    return 'red';
  }

  if ( value >= minValue && value <= maxValue ) {
    return 'green';
  }

}


proveAnalisiNormativa() {
  this.initializeColumnsDefs();
  this.updateGrid();
}

ngOnInit() {
  super.ngOnInit();
  this.normativaSelezionata = '';

  // this.activatedRoute.parent.params.subscribe(params => {
  //   if ( params.lotto != null  ) {
  //     this.lotto = params.lotto;
  //   }
  // });

  this.updateGrid();
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}

methodFromParent( coda: AccodaGenerazioneProvaModel) {
  // alert('lotto collaudo methodFromParent ' + coda );
  // this.proveSelezionate.push(coda);
  console.log('PARENT ' + coda.NumeroProva + ' ' + coda.Stato);
  this.updateProveSelezionate(coda.NumeroProva, coda.Stato);
}

updateProveSelezionate( numeroProva, stato ) {
  if ( this.proveSelezionate == null ) {
    this.proveSelezionate = [];
  }

  if ( stato === false ) {
    this.proveSelezionate = this.proveSelezionate.filter(obj => obj !== numeroProva);
  } else {
    this.proveSelezionate.push(numeroProva);
  }

  console.log(this.proveSelezionate);

}
}