import { Component, OnInit, Output, Input } from '@angular/core';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { HeaderGridComponent } from 'src/app/features/modules/lotto/header-grid-component/header-grid-component.component';
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

  normativaSelezionata: string;
  commessaSelezionata: string;
  private currentPrescritta: string;
  elencoCommesse: string[];
  Prescritte: string[];
  // tslint:disable-next-line:no-any
  columnDefs: any[];
  // tslint:disable-next-line:no-any
  elaboratoFormatter: any;
  // tslint:disable-next-line:no-any
  rowData: any[];
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  // tslint:disable-next-line:no-any
  frameworkComponents: any;

  defaultColDef;
  private message = '';
  private urlString = '';
  private lottiToGenerate: string[];
  private prove: string[];
  private proveSelezionate: string[];

  context;
  // private elementiCoda: AccodaGenerazioneModel[];

  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  isLoading: boolean;
  gcc: boolean;


  constructor(http: HttpClient,
              activatedRoute: ActivatedRoute,
              router: Router,
              dataService: LottoDataService) {

                super( http, activatedRoute, dataService);
                this.proveSelezionate = [];

                this.normativaSelezionata = 'EURAL';

                this.overlayLoadingTemplate =
                '<span class="ag-overlay-loading-center" style="font-size: 18px">Ricerca in corso. Attendere...</span>';
                this.overlayNoRowsTemplate =
                // tslint:disable-next-line:max-line-length
                '<span style="font-size: 18px; padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;">Nessun risultato soddisfa la ricerca</span>';

                this.isLoading = true;

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
      // {
      //   headerName: 'Selezione',
      //   width: 100,
      //   headerCheckboxSelection: true,
      //   checkboxSelection: true
      // },
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

    // this.ds.GetCollaudo(this.lotto, this.normativaSelezionata)
    this.ds.getCollaudoWithToken(this.lotto, this.normativaSelezionata)
          .subscribe(data => {

            this.columnDefs = [];

            this.rowData = data.TabellaCollaudo;
            this.Prescritte = data.Prescritte;
            this.elencoCommesse = data.ElencoCommesse;
            this.prove = data.Prove;
            this.normativaSelezionata = data.NormativaSelezionata;
            this.gcc = data.GeneraCertificatiCliente;

            this.commessaSelezionata = this.elencoCommesse[0];

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
                      console.log(params.data);
                      const valColore = value + '_colore';
                      // console.log('COLORE : ' + params.data[valColore]);
                      return { backgroundColor: params.data[valColore] };
                  }
              } );
            } );

          //   this.columnDefs.push ( {
          //     headerName: 'Eventi',
          //     resizable: false,
          //     cellRenderer: 'accodaRenderer',
          //     width: 90
          // });

            // console.log(this.columnDefs);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.isLoading = false;

            this.gridApi.hideOverlay();
            // console.log(this.showLoading);

         });

        }

proveCollaudoNormativa() {
  this.isLoading = true;
  this.gridApi.hideOverlay();
  this.updateGrid();
}

ngOnInit() {
  super.ngOnInit();
  this.normativaSelezionata = '';
  this.commessaSelezionata = '';

  // this.activatedRoute.parent.params.subscribe(params => {
  //   if ( params.lotto != null  ) {
  //     this.lotto = params.lotto;
  //   }
  // });
}

onGridReady(params) {
  this.isLoading = true;
  console.log('gridReady');
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.updateGrid();
}

methodFromParent( coda: AccodaGenerazioneProvaModel) {
  // alert('lotto collaudo methodFromParent ' + coda );
  // this.proveSelezionate.push(coda);
  console.log('METHOD FROM PARENT LOTTO COLLAUDO ' + coda.NumeroProva + ' ' + coda.Stato);
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

generaCertificatoProve() {

  const elementoCoda = new AccodaGenerazioneModel();

  elementoCoda.Lotto = this.lotto;
  elementoCoda.Commessa = this.commessaSelezionata;
  elementoCoda.ProveSelezionate = this.proveSelezionate;
  elementoCoda.TipoAccodamento = 2;

  this.ds.accodaCertificato(elementoCoda);

}



}




