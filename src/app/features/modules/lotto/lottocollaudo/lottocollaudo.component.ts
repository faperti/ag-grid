import { Component, OnInit, Output, Input } from '@angular/core';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { HeaderGridComponent } from 'src/app/header-grid-component/header-grid-component.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AccodaGenerazioneCertificatoRendererComponent } from 'src/app/renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';
import { AccodaGenerazioneProvaModel } from 'src/app/renderers/model/accoda-generazione-prova-model';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-lottocollaudo',
  templateUrl: './lottocollaudo.component.html',
  styleUrls: ['./lottocollaudo.component.scss']
})
export class LottocollaudoComponent implements OnInit {

  @Input() lotto: string;
  // @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  private normativaSelezionata: string;
  private currentPrescritta: string;
  private Prescritte: string[];
  private columnDefs: any[];
  private defaultColDef;
  private rowData: any[];
  private rowDataLoaded: any;
  private message = '';
  private urlString = '';
  private lottiToGenerate: string[];
  private prove: string[];
  private proveSelezionate: string[];
  private frameworkComponents: any;
  private context;
  private elementiCoda: AccodaGenerazioneModel[];
  elaboratoFormatter: any;
  private overlayLoadingTemplate: string;
  private overlayNoRowsTemplate: string;
  private showLoading: boolean;


  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
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
    // tslint:disable-next-line:max-line-length
    this.urlString = 'http://localhost:4518/api/ProveCollaudoReport?lotto=' + this.lotto + '&normativa=' + this.normativaSelezionata;
    // alert(this.urlString);

    this.http
          .get<any>(this.urlString)
          .subscribe(data => {
            this.rowData = data.TabellaCollaudo;
            this.Prescritte = data.Prescritte;
            this.prove = data.Prove;
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

            // tslint:disable-next-line:only-arrow-functions
            this.prove.forEach( (value) => {
              this.columnDefs.push( {
                  headerName: 'Prova ' + value,
                  headerComponentParams: { showCheck: true, numeroProva: value },
                  field: value,
                  width: 110,
                  hide: false,
                  suppressMenu: true,
                  // tslint:disable-next-line:object-literal-shorthand
                  cellStyle: function(params) {
                      const valColore = value + '_colore';
                      // console.log('COLORE : ' + params.data[valColore]);
                      return { backgroundColor: params.data[valColore] };
                  }
              } );
            } );

            this.columnDefs.push ( {
              headerName: 'Eventi',
              resizable: false,
              cellRenderer: 'accodaRenderer',
              colId: 'params',
              width: 90
          });

            // console.log(this.columnDefs);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.showLoading = false;

          });
}

proveCollaudoNormativa() {
  this.initializeColumnsDefs();
  this.updateGrid();
}

ngOnInit() {
  this.normativaSelezionata = '';

  this.activatedRoute.parent.params.subscribe(params => {
    if ( params.lotto != null  ) {
      this.lotto = params.lotto;
    }
  });

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

// generateCert(value: string[]) {

//   this.updatesToSend = [];
//   this.updates = value.length;

//   value.forEach(element => {

//     const current = { lotto: element, commessa: ''};
//     this.updatesToSend.push(current);

//   });

//   console.log('PARENT 1 : ' + this.updatesToSend);

//   const headers = new HttpHeaders().set('Content-type', 'application/json');
//   const body = {
//                       body: this.updatesToSend
//                };

//   console.log(body);

//   this.http.post<GenerateCertsResult>('http://localhost:4518/api/Stampe', this.updatesToSend, {headers} )
//     .subscribe(res => {
//       alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
//     });
// }


}




