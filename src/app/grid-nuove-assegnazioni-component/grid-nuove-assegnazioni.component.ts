import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';
import { AnchorEventClickRendererComponent } from '../anchor-event-click-renderer/anchor-event-click-renderer.component';
import { ElaboratoAssegnazioneRendererComponent } from '../elaborato-assegnazione-renderer/elaborato-assegnazione-renderer.component';

@Component({
  selector: 'app-grid-nuove-assegnazioni-component',
  templateUrl: './grid-nuove-assegnazioni.component.html',
  styleUrls: ['./grid-nuove-assegnazioni.component.scss']
})
export class GridNuoveAssegnazioniComponent implements OnInit, OnChanges {

  @Input() inpCriteria: SearchCriteriaRiassegnazioni;
  @Input() gridData: any[];
  @Input() emptyData: boolean;
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;
  private rowDataLoaded: any;
  norecordfound = 'No record found';
  private urlString = '';
  private variazioniToGenerate: any[];
  variazioniResults: string[];
  variazioniReady: boolean;
  showVariazioni: boolean;


    constructor(private http: HttpClient) {

      this.columnDefs = [
        {
          headerName: '#',
          field: 'idRiassegnazione',
          width: 90
        },
        {
          headerName: 'Selezione',
          width: 100,
          headerCheckboxSelection: true,
          checkboxSelection: true
        },
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
          // cellRendererParams: {
          //   idVar: "idRiassegnazione",
          //   commessaDa: '9988776655'
          // },
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
          width: 110
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

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges() {
      console.log('grid riassegnazioni component: ONCHANGES');

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

      console.log( 'updateGrid grid data : ' + this.gridData );

      // this.rowData = this.gridData;
      // if ( this.gridData !== undefined && this.gridData.length > 0 ) {
      //   console.log('hideoverlay');
      //   this.gridApi.hideOverlay();
      // }

      // if (this.gridApi !== undefined) {
          //   this.gridApi.showLoadingOverlay();
          // }

          // // alert('UPDATE GRID riassegnazioni component');
          // // tslint:disable-next-line:max-line-length
          // this.urlString = 'http://localhost:4518/api/RiAssegnazioniSMEA?';
          // this.urlString = this.urlString + 'data_da=' + this.inpCriteria.DataStart;
          // this.urlString = this.urlString + '&data_a=' + this.inpCriteria.DataEnd;

          // alert(this.urlString);

          // this.http
          //       .get(this.urlString)
          //       .subscribe(data => {
          //         this.rowDataLoaded = data;
          //         if ( this.rowDataLoaded.length > 0 ) {
          //             this.rowData = this.rowDataLoaded;
          //             console.log(this.rowData);
          //           }
          //       });
    }

    ngOnInit() {
      this.inpCriteria = new SearchCriteriaRiassegnazioni();
      this.inpCriteria.DataStart = '';
      this.inpCriteria.DataEnd = '';

      this.variazioniReady = false;
      this.showVariazioni = true;
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

    // printCerts() {
    //   this.lottiToGenerate = [];
    //   const rowsSelection = this.gridApi.getSelectedRows();

    //   rowsSelection.forEach(element => {
    //     this.lottiToGenerate.push(element.lotto);
    //   });

    //   console.log('PRINT CERTS : ' + this.lottiToGenerate);

    //   this.generateCerts.emit(this.lottiToGenerate);
    // }

    onGridReady(params) {
      console.log('onGridReady');
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      console.log('grid ready empty data : ' + this.emptyData);

      if ( this.emptyData || this.emptyData === undefined ) {
        this.gridApi.hideOverlay();
        this.gridApi.showNoRowsOverlay();
      }

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
      alert('impAssegnazioni');
      // tslint:disable-next-line:prefer-const

      for (const item of this.rowDataLoaded) {
        if ( item.elaborato === true ) {
          this.variazioniToGenerate.push(item.id_variaz);
          console.log(item. id_variaz + ' ' + item.commessaDa + ' ' + item.elaborato);
        }
      }

      console.log(this.variazioniToGenerate);

      this.http.post<string[]>('http://localhost:4518/api/RiAssegnazioniSMEA', this.variazioniToGenerate, {headers} )
      .subscribe(res => {
        this.variazioniResults = res;
        if ( this.variazioniResults.length > 0 ) {
          this.variazioniReady = true;
        } else {
          this.variazioniReady = false;
        }
        alert(this.variazioniResults);
      });
    }

    showVariazioniValues() {
      this.showVariazioni = !this.showVariazioni;
    }
  }

