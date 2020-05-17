import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise';


import { CommonService } from 'src/app/shared/services/common.service';
import { SearchCriteriaCodaGenerazioneCertificati } from 'src/app/model/SearchCriteriaCodaGenerazioneCertificati';
import { StampaCertificatoRendererComponent } from './stampa-certificato-renderer/stampa-certificato-renderer.component';
import { RigaCodaStampa } from './model/rigaCodaStampa';



@Component({
  selector: 'app-codastampa',
  templateUrl: './codastampa.component.html',
  styleUrls: ['./codastampa.component.scss']
})
export class CodastampaComponent implements OnInit {

  @Input() inpCriteria: SearchCriteriaCodaGenerazioneCertificati;
  // tslint:disable-next-line:no-any
  // @Input() gridData: any[];
  @Input() gridData: RigaCodaStampa[];
  @Output() generateCerts = new EventEmitter<string[]>();
  @Output() importGenerazioni = new EventEmitter<number[]>();

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  // tslint:disable-next-line:no-any
  rowData: any;
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  private urlString = '';
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;

  // tslint:disable-next-line:no-any
  private variazioniToGenerate: any[];
  variazioniResults: string[];
  variazioniReady: boolean;
  showVariazioni: boolean;


    constructor(private http: HttpClient, private commonService: CommonService) {

    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges() {
      console.log('DETTAGLI IMPORTAZIONE : ');

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

      console.log('UPDATEGRID CODA STAMPA COMPONENT');
      // console.log(this.dettagliImportazione);

      // if ( this.dettagliImportazione.length > 0 ) {
      //   this.dettagliImportazione.forEach( val => {
      //     // console.log(val);
      //     this.gridData.forEach(riga => {
      //         // console.log(riga);
      //         if (riga.id_variaz === val.NumeroVariazione ) {
      //           console.log('TROVATA ' + riga.id_variaz);
      //           console.log(val);
      //           riga.statoImportazione = val.VariazioneResult;
      //         }
      //       });
      //     // this.gridData.find(riga => riga.id_variaz === val.NumeroVariazione).statoImportazione = val.Stato;
      //   });

      //   // console.log(this.gridData);

      //   const params = { force: true };
      //   this.gridApi.refreshCells(params);

      // }

      // this.gridData.find()


      // console.log( 'updateGrid grid data : ' + this.gridData );

    }

    ngOnInit() {
      this.inpCriteria = new SearchCriteriaCodaGenerazioneCertificati();
      this.inpCriteria.DataStart = '';
      this.inpCriteria.DataEnd = '';
      this.inpCriteria.Tipo = -1;

      this.variazioniReady = false;
      this.showVariazioni = true;

      this.overlayLoadingTemplate = this.commonService.overlayLoadingTemplate;
      this.overlayNoRowsTemplate = this.commonService.overlayNoRowsTemplate;

      this.columnDefs = [
        {
          headerName: '#',
          field: 'id_generazione',
          width: 50
        },
        // {
        //   headerName: 'Selezione',
        //   width: 100,
        //   headerCheckboxSelection: true,
        //   checkboxSelection: true
        // },
        {
          headerName: 'Data Invio',
          field: 'datainvio',
          width: 150
        },
        {
          headerName: 'Lotto',
          field: 'lotto',
          width: 110
        },
        {
          headerName: 'Commessa',
          field: 'commessa',
          width: 110
        },
        {
          headerName: 'Tipo Generazione',
          field: 'tipogenerazione',
          width: 110
        },
        {
          headerName: 'Elenco Prove',
          field: 'elencoprove',
          width: 120
        },
        {
          headerName: 'Generato',
          field: 'generato',
          width: 150
        },
        {
          headerName: 'Stampa',
          cellRendererFramework: StampaCertificatoRendererComponent,
          cellRendererParams: { statoComponente: {  dataElaborato: 'elbaorazine dati' } },
          field: 'stampa',
          resizable: true,
          width: 190
        }

      ];
      this.defaultColDef = {
        sortable: true,
        filter: true
      };

      this.variazioniReady = false;

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

    commessaDaRenderer(params) {

      const resultRenderer = '<button (click)="passTheSalt(' +
      params.data.id_variaz + ')">Premi</button>';

      // console.log(resultRenderer);
      return resultRenderer;

    }

    onGridReady(params) {
      console.log('onGridReady');
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // console.log('grid ready empty data : ' + this.emptyData);

      // if ( this.emptyData || this.emptyData === undefined ) {
      //   this.gridApi.hideOverlay();
      //   this.gridApi.showNoRowsOverlay();
      // }

      // this.gridApi.hideOverlay();
      // this.gridApi.showNoRowsOverlay();
    }

    onPageSizeChanged(newPageSize) {

      // this.lottiToGenerate = [];
      // const rowsSelection = this.gridApi.getSelectedRows();

      // rowsSelection.forEach(element => {
      //   this.lottiToGenerate.push(element.lotto);
      // });

      // this.generateCerts.emit(this.lottiToGenerate);

    }

    impAssegnazioni() {
      this.variazioniToGenerate = [];
      // const headers = new HttpHeaders().set('Content-type', 'application/json');

      for (const item of this.gridData) {
        if ( item.stampa === true ) {
          this.variazioniToGenerate.push(item.id_generazione);
        }
      }

      console.log(this.variazioniToGenerate);

      this.importGenerazioni.emit(this.variazioniToGenerate);


      // this.http.post<string[]>('http://localhost:4518/api/RiAssegnazioniSMEA', this.variazioniToGenerate, {headers} )
      // .subscribe(res => {
      //   this.variazioniResults = res;
      //   if ( this.variazioniResults.length > 0 ) {
      //     this.variazioniReady = true;
      //   } else {
      //     this.variazioniReady = false;
      //   }
      //   alert(this.variazioniResults);
      // });
    }

    showVariazioniValues() {
      this.showVariazioni = !this.showVariazioni;
    }
  }