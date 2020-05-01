import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { AccodaGenerazioneCertificatoRendererComponent } from '../../../../renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';
import { AccodaGenerazioneModel } from '../../../../renderers/model/accoda-generazione-model';


// ag-grid
import 'ag-grid-enterprise';
import { LottoDataService } from '../lotto-data.service';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { NoteClienteRendererComponent } from 'src/app/features/modules/lotto/lottoclienti/NoteClienteRenderer/NoteClienteRenderer';
import { CellEvent } from 'ag-grid-community/dist/lib/events';

@Component({
  selector: 'app-lottoclienti-component',
  templateUrl: './lottoclienti.component.html',
  styleUrls: ['./lottoclienti.component.scss']
})
export class LottoclientiComponent extends BaseLottoView implements OnInit, OnChanges {
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  columnDefs;
  rowStyle = {
    // 'font-size': '14px'
  };
  defaultColDef;
  // tslint:disable-next-line:no-any
  rowData: any;
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  private message = '';
  private urlString = '';
  private lottiToGenerate: string[];
  // tslint:disable-next-line:no-any
  frameworkComponents: any;
  context;
  showModal = false;
  title = '';
  content = '' ;
  private elementiCoda: AccodaGenerazioneModel[];

    constructor(http: HttpClient,
                activatedRoute: ActivatedRoute,
                router: Router,
                dataservice: LottoDataService ) {

      super(http, activatedRoute, dataservice);
      this.frameworkComponents = {
        accodaRenderer: AccodaGenerazioneCertificatoRendererComponent,
        noteClienteRenderer: NoteClienteRendererComponent
      };

      this.columnDefs = [
        // {
        //   headerName: 'Selezione',
        //   width: 100,
        //   headerCheckboxSelection: true,
        //   checkboxSelection: true
        // },
        {
          headerName: 'Conferma',
          field: 'commessa',
          width: 110
        },
        {
          headerName: 'Ordine Cliente',
          field: 'ordine_cliente',
          width: 110
        },
        {
          headerName: 'Codice cliente',
          field: 'cod_cliente',
          width: 110
        },
        {
          headerName: 'Cliente',
          field: 'des_cliente',
          width: 150
        },
        {
          headerName: 'Note Cliente',
          resizable: false,
          cellRenderer: 'noteClienteRenderer',
          cellStyle: { 'text-align': 'center' },
          colId: 'params',
          width: 100
        },
        {
          headerName: 'Normativa',
          field: 'des_normativa',
          width: 110
        },
        {
          headerName: 'Tipo certificato',
          field: 'des_tipocertificato',
          width: 110
        },
        {
          headerName: 'Kg Ordinati',
          field: 'kg_ordinati',
          width: 90
        },
        {
          headerName: 'Kg Assegnati',
          field: 'kg_assegnati',
          width: 90
        },
        {
          headerName: 'Note',
          field: 'note',
          width: 200
        },
        {
          headerName: 'Elaborato',
          field: 'elaborato',
          resizable: true,
          valueFormatter: this.elaboratoFormatter,
          width: 90
        },
        {
          headerName: 'Eventi',
          resizable: false,
          cellRenderer: 'accodaRenderer',
          colId: 'params',
          // cellRendererParams: {
          //   onClick: this.accodaCert.bind(this)
          // },
          width: 110
        }
      ];
      this.context = { componentParent: this };
      this.defaultColDef = {
        sortable: true,
        filter: true
      };

    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges() {
      // alert('grid riassegnazioni component: ONCHANGES');

      this.updateGrid();
    }

    elaboratoFormatter(params) {
      if (params.value === 0) {
        return 'Da elaborare';
      }

      if (params.value === 1) {
        return 'Elaborato e Stampato';
      }

      if (params.value === 2) {
        return 'Elaborato e da stampare';
      }
    }

    updateGrid() {
    console.log('UPDATE GRID LOTTO CLIENTI component');

    // tslint:disable-next-line:max-line-length
    this.ds.GetClienti(this.lotto)
      .subscribe(data => {
        this.rowData = data;
      });
    }



    ngOnInit() {
      console.log('LOTTO CLIENTI INIT');
      super.ngOnInit();
      this.updateGrid();
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

    // tslint:disable-next-line:no-any
    accodaCert(valori: any) {
      alert('accoda cert da griglia');
      console.log(valori);
    }

    printCerts() {
      this.lottiToGenerate = [];
      const rowsSelection = this.gridApi.getSelectedRows();

      rowsSelection.forEach(element => {
        this.lottiToGenerate.push(element.lotto);
      });

      console.log('PRINT CERTS : ' + this.lottiToGenerate);

      this.generateCerts.emit(this.lottiToGenerate);
    }

    onGridReady(params) {
      console.log('LOTTO CLIENTI GRID READY');
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.gridApi.hideOverlay();
    }

    onCellClicked(event: CellEvent) {
      console.log(event.colDef.headerName);

      if ( event.colDef.headerName === 'Note Cliente') {
        console.log(event.data.note);
        console.log(event);

        this.content = event.data.note;
        this.title = 'NOTE';

        this.showModal = true;
      }
    }

    hide() {
      this.showModal = false;
    }

    show() {
      this.showModal = true;
      this.content = 'CONTENT!';
      this.title = 'TITLE';
    }


    onPageSizeChanged(newPageSize) {

      this.lottiToGenerate = [];
      const rowsSelection = this.gridApi.getSelectedRows();

      rowsSelection.forEach(element => {
        this.lottiToGenerate.push(element.lotto);
      });

      this.generateCerts.emit(this.lottiToGenerate);

    }

    vipRenderer(params) {
      let cert = '';
      // tslint:disable-next-line:prefer-const
      if ( !params.data.IsVip ) {
        cert = '<img border="0" width="32" height="32"' +
      ' src="/assets/images/vip.gif"></img>';
      }
      return cert;
    }

    eventiRenderer(params) {
      let cert = '';
      // tslint:disable-next-line:prefer-const
      if ( !params.data.IsVip ) {
        cert = '<div (click)="accoda(\'' + params.data.commessa + '\')"><img border="0" width="32" height="32"' +
      ' src="/assets/images/accoda.gif"></img></div>';
      }
      return cert;
    }


    mostraNote(params) {
      const note1 = params.data.note;
      const note2 = params.data.notelaboratorio;

      // console.log('NOTE1 :' + note1 + ' NOTE2 :' + note2);

      alert(note1 + '\r\n' + note2);
    }

    // methodFromParent( coda: AccodaGenerazioneModel) {
    //   alert('methodFromParent ' + coda.Lotto + ' ' + coda.Commessa + ' ' + coda.TipoAccodamento);

    //   this.elementiCoda = [ coda ];

    //   const headers = new HttpHeaders().set('Content-type', 'application/json');

    //   this.http.post<string[]>('http://localhost:4518/api/Stampe', this.elementiCoda, {headers} )
    //   .subscribe(res => {
    //     alert(res);
    //     console.log(res);
        // if ( this.variazioniResults.length > 0 ) {
        //   this.variazioniReady = true;
        // } else {
        //   this.variazioniReady = false;
        // }
        // alert(this.variazioniResults);
        // alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
    //  });
    // }


  }

