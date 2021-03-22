import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import { SearchCriteriaCertificatoProve } from '../model/SearchCriteriaCertificatoProve';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

import { AccodaGenerazioneProvaModel } from 'src/app/renderers/model/accoda-generazione-prova-model';
import { HeaderGridComponent } from 'src/app/features/modules/lotto/header-grid-component/header-grid-component.component';
import { AccodaGenerazioneModel } from '../renderers/model/accoda-generazione-model';

@Component({
  selector: 'app-grid-certificato-provecomponent',
  templateUrl: './grid-component-certificato-prove.component.html',
  styleUrls: ['./grid-component-certificato-prove.component.scss']
})
export class GridCertificatoProveComponent implements OnInit, OnChanges {

  @Input() inpCriteria: SearchCriteriaCertificatoProve;
  @Input() inpStampa: boolean;
  @Output() generateCert = new EventEmitter<AccodaGenerazioneModel>();

  private gridApi;
  private gridColumnApi;

  private normativaSelezionata: string;
  private currentPrescritta: string;
  private Prescritte: string[];
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
  private acm: AccodaGenerazioneModel;
  // tslint:disable-next-line:no-any
  elaboratoFormatter: any;
  private overlayLoadingTemplate: string;
  private overlayNoRowsTemplate: string;
  private showLoading: boolean;

  updateGrid() {
    console.log('INPCRITERIA GRIDCOMPONENT : ' + this.inpCriteria);
    if ( this.inpCriteria !== undefined) {
    this.showLoading = true;
    // tslint:disable-next-line:max-line-length
    this.urlString = 'http://localhost:4518/api/ProveCollaudoReport?lotto=' + this.inpCriteria.Lotto + '&normativa=' + this.normativaSelezionata;
    console.log(this.urlString);

    this.http.get<any>(this.urlString)
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

          //   this.columnDefs.push ( {
          //     headerName: 'Eventi',
          //     resizable: false,
          //     cellRenderer: 'accodaRenderer',
          //     colId: 'params',
          //     width: 90
          // });

            console.log(this.columnDefs);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.showLoading = false;

          });
        }
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

    constructor(private http: HttpClient) {

      this.proveSelezionate = [];

      this.normativaSelezionata = 'EURAL';
      this.overlayLoadingTemplate =
        '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
      this.overlayNoRowsTemplate =
        '<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom no rows overlay</span>';

      this.showLoading = true;

      this.initializeColumnsDefs();

      this.frameworkComponents = {
        agColumnHeader: HeaderGridComponent
      };

      this.context = { componentParent: this };
      this.defaultColDef = {
        sortable: true,
        filter: true
      };

      // this.updateGrid();

    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
      // changes.prop contains the old and the new value...
      // alert('Grid Changes');

      // console.log(' VALORE CORRENTE : ' + changes.inpCriteria.currentValue);
      // console.log(' VALORE PRECEDENTE : ' + changes.inpCriteria.previousValue);

      // this.showCriteria();
      this.updateGrid();
    }

    ngOnInit() {
      // this.showCriteria();
    }

    certificatoFormatter(params) {
      // return '(' + params.Certificato + ') - ' + params.imgCertificato;
      // console.log('PAR ' + params.certificato);
      return '(' + params.value + ') - ';
    }

    certificatoGetter(params) {
      return '(' + params.data.certificato + ') - ' + params.data.imgCertificato;
      // console.log('PAR ' + params.certificato);
      // return '(' + params.certificato + ') - ';
    }

    certificatoRenderer(params) {

      // tslint:disable-next-line:prefer-const
      let cert = '<img border="0" width="32" height="32"' +
      ' src="/assets/images/' +
      params.data.imgCertificato + '"></img>';

      return cert;
    }

    // printCerts() {
    //   this.lottiToGenerate = [];
    //   const rowsSelection = this.gridApi.getSelectedRows();

    //   rowsSelection.forEach(element => {
    //     this.lottiToGenerate.push(element.lotto);
    //   });

    //   console.log('PRINT CERTS : ' + this.lottiToGenerate);

    //   this.generateCert.emit(this.lottiToGenerate);
    // }

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

    showCriteria() {

    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.gridApi.hideOverlay();
    }

    onPageSizeChanged(newPageSize) {

      // this.lottiToGenerate = [];
      // const rowsSelection = this.gridApi.getSelectedRows();

      // rowsSelection.forEach(element => {
      //   this.lottiToGenerate.push(element.lotto);
      // });

      // this.generateCert.emit(this.lottiToGenerate);

    }

    public invokeParentMethod() {

      this.acm = new AccodaGenerazioneModel();
      this.acm.Lotto = '1234567890';
      this.acm.Commessa = '1122334455';

      // il tipo di accodamento indica l'eventuale operazione che deve essere compiuta dal generatore dei certificati
      this.acm.TipoAccodamento = 3; // tipoGenerazione;
      this.acm.ProveSelezionate = this.proveSelezionate;

      // tslint:disable-next-line:max-line-length
      this.generateCert.emit(this.acm);
  }



  }

