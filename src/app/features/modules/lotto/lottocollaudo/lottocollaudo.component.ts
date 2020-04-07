import { Component, OnInit, Output, Input } from '@angular/core';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { HeaderGridComponent } from 'src/app/header-grid-component/header-grid-component.component';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AccodaGenerazioneCertificatoRendererComponent } from 'src/app/renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';
import { AccodaGenerazioneProvaModel } from 'src/app/renderers/model/accoda-generazione-prova-model';
import { getCurrencySymbol } from '@angular/common';
import { LottoDataService } from '../lotto-data.service';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lottocollaudo',
  templateUrl: './lottocollaudo.component.html',
  styleUrls: ['./lottocollaudo.component.scss']
})
export class LottocollaudoComponent extends BaseLottoView implements OnInit {

  @Input() lotto = '';
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


  constructor(http: HttpClient,
              activatedRoute: ActivatedRoute,
              router: Router,
              dataservice: LottoDataService) {

                super( http, activatedRoute, dataservice);
                this.proveSelezionate = [];

                this.normativaSelezionata = 'EURAL';

                this.overlayLoadingTemplate =
                '<span class="ag-overlay-loading-center" style="font-size: 18px">Ricerca in corso. Attendere...</span>';
                this.overlayNoRowsTemplate =
                '<span style="font-size: 18px; padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Nessun risultato soddisfa la ricerca</span>';

                this.showLoading = false;

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
    // console.log('UPDATE GRID IN');
    this.gridApi.showLoadingOverlay();

    this.ds.GetCollaudo(this.lotto, this.normativaSelezionata)
          .subscribe(data => {
            this.rowData = data.TabellaCollaudo;
            this.Prescritte = data.Prescritte;
            this.prove = data.Prove;
            this.normativaSelezionata = data.NormativaSelezionata;

            this.initializeColumnsDefs();

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

            console.log(this.columnDefs);

            // console.log(this.columnDefs);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.showLoading = false;

            this.gridApi.hideOverlay();
            // console.log(this.showLoading);

         });

    // setTimeout(() => {
    //   this.gridApi.hideOverlay();
    //   console.log('SHOWLOADING : ' + this.showLoading);
    //   console.log('UPDATE GRID OUT');
    // }, 5000 );



        }

proveCollaudoNormativa() {
  this.gridApi.hideOverlay();


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
}

onGridReady(params) {
  // console.log('gridReady');
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.updateGrid();
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




