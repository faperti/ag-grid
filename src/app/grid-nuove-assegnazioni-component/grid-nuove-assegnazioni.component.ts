import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';
import { AnchorEventClickRendererComponent } from '../anchor-event-click-renderer/anchor-event-click-renderer.component';
import { ElaboratoAssegnazioneRendererComponent } from '../elaborato-assegnazione-renderer/elaborato-assegnazione-renderer.component';
import { CommonService } from '../shared/services/common.service';
import { Dettaglio, ElencoVariazioni } from '../features/containers/importa-riassegnazioni-container/model/importaVariazioni';

@Component({
  selector: 'app-grid-nuove-assegnazioni-component',
  templateUrl: './grid-nuove-assegnazioni.component.html',
  styleUrls: ['./grid-nuove-assegnazioni.component.scss']
})
export class GridNuoveAssegnazioniComponent implements OnInit, OnChanges {

  @Input() inpCriteria: SearchCriteriaRiassegnazioni;
  // tslint:disable-next-line:no-any
  // @Input() gridData: any[];
  @Input() gridData: ElencoVariazioni[];
  @Input() dettagliImportazione: Dettaglio[];
  @Output() generateCerts = new EventEmitter<string[]>();
  @Output() importVariazioni = new EventEmitter<string[]>();

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
      console.log(this.dettagliImportazione);

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

    trovaVariazione(val, numeroVariazione) {
       return val.id_variaz === numeroVariazione;
    }

    updateGrid() {

      console.log('UPDATEGRID DETTAGLI IMPORTAZIONE');
      console.log(this.dettagliImportazione);

      if ( this.dettagliImportazione.length > 0 ) {
        this.dettagliImportazione.forEach( val => {
          // console.log(val);
          this.gridData.forEach(riga => {
              // console.log(riga);
              if (riga.id_variaz === val.NumeroVariazione ) {
                console.log('TROVATA ' + riga.id_variaz);
                console.log(val);
                riga.statoImportazione = val.VariazioneResult;
              }
            });
          // this.gridData.find(riga => riga.id_variaz === val.NumeroVariazione).statoImportazione = val.Stato;
        });

        // console.log(this.gridData);

        const params = { force: true };
        this.gridApi.refreshCells(params);

      }

      // this.gridData.find()


      // console.log( 'updateGrid grid data : ' + this.gridData );

    }

    ngOnInit() {
      this.inpCriteria = new SearchCriteriaRiassegnazioni();
      this.inpCriteria.DataStart = '';
      this.inpCriteria.DataEnd = '';

      this.variazioniReady = false;
      this.showVariazioni = true;

      this.overlayLoadingTemplate = this.commonService.overlayLoadingTemplate;
      this.overlayNoRowsTemplate = this.commonService.overlayNoRowsTemplate;

      this.columnDefs = [
        {
          headerName: '#',
          field: 'id_variaz',
          width: 90
        },
        // {
        //   headerName: 'Selezione',
        //   width: 100,
        //   headerCheckboxSelection: true,
        //   checkboxSelection: true
        // },
        {
          headerName: 'Data',
          field: 'data_variazione',
          width: 110
        },
        {
          headerName: 'Lotto',
          field: 'lotto',
          width: 110
        },
        {
          headerName: 'Da',
          cellRendererFramework: AnchorEventClickRendererComponent,
          width: 110
        },
        {
          headerName: 'A',
          field: 'commessaA',
          width: 110
        },
        {
          headerName: 'Collo',
          field: 'collo',
          width: 120
        },
        {
          headerName: 'KgVariazione',
          field: 'kgvariazione',
          width: 110
        },
        {
          headerName: 'Note',
          field: 'note_odv',
          width: 110
        },
        {
          headerName: '# SMEA',
          field: 'id_SMEA',
          width: 90
        },
        {
          headerName: 'Stato Imp.',
          field: 'statoImportazione',
          width: 90
        },
        {
          headerName: 'Elaborato',
          cellRendererFramework: ElaboratoAssegnazioneRendererComponent,
          cellRendererParams: { statoComponente: {  dataElaborato: '12345', checkboxVisibile: true } },
          field: 'elaborato',
          resizable: true,
          valueFormatter: this.elaboratoFormatter,
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
      const headers = new HttpHeaders().set('Content-type', 'application/json');

      for (const item of this.gridData) {
        if ( item.elaborato === true ) {
          this.variazioniToGenerate.push(item.id_variaz);
          console.log(item. id_variaz + ' ' + item.commessaDa + ' ' + item.elaborato);
        }
      }

      console.log(this.variazioniToGenerate);

      this.importVariazioni.emit(this.variazioniToGenerate);


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

