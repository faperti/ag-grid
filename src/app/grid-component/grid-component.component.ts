import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import { SearchCriteria } from '../model/searchCriteria';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';


@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.scss']
})
export class GridComponentComponent implements OnInit, OnChanges {

  @Input() inpCriteria: SearchCriteria;
  @Input() inpStampa: boolean;
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: any;
  private rowDataLoaded: any;
  private message = '';
  private urlString = '';
  private lottiToGenerate: string[];

    constructor(private http: HttpClient) {
      this.columnDefs = [
        {
          headerName: 'Lotto', field: 'lotto',
          width: 120,
          cellRendererFramework: RouterLinkRendererComponent,
          cellRendererParams: {
            inRouterLink: '/lotto'
          }
        },
        {
          headerName: 'Lega',
          field: 'des_lega',
          width: 90
        },
        {
          headerName: 'MatrDim',
          field: 'matrdim',
          width: 110
        },
        {
          headerName: 'Forma',
          field: 'des_forma',
          width: 200
        },
        {
          headerName: 'SC',
          field: 'des_statociclo',
          width: 100
        },
        {
          headerName: 'SF',
          field: 'des_statofisico',
          width: 100
        },
        {
          headerName: 'Richiesta',
          field: 'richiesta',
          width: 100
        },
        {
          headerName: 'Data Lancio',
          field: 'datalancio',
          width: 100
        },
        {
          headerName: 'Data Chiusura',
          field: 'data_chiusura',
          width: 100
        },
        {
          headerName: 'Certificato',
          cellRenderer: this.certificatoRenderer,
          // valueGetter: this.certificatoGetter,
          // valueFormatter: this.certificatoFormatter,
          // field: 'certificato',
          width: 100
        },
        {
          headerName: 'Codice',
          field: 'codice',
          width: 100
        },
        {
          headerName: 'Estrusione',
          field: 'data_estrusione_str',
          width: 100
        },
        {
          headerName: 'Trazione',
          field: 'data_trazione_str',
          width: 100
        },
        {
          headerName: 'Tempra',
          field: 'data_tempra_str',
          width: 100
        },
        {
          headerName: 'Analisi',
          field: 'data_analisi_str',
          width: 100
        },
        {
          headerName: 'Selezione',
          width: 100,
          headerCheckboxSelection: true,
          checkboxSelection: true
        }
      ];
      this.defaultColDef = {
        sortable: true,
        filter: true
      };
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
      // changes.prop contains the old and the new value...

      // alert('Grid Changes');

      console.log(' VALORE CORRENTE : ' + changes.inpCriteria.currentValue);
      console.log(' VALORE PRECEDENTE : ' + changes.inpCriteria.previousValue);

      this.showCriteria();

      this.updateGrid();
    }

    updateGrid() {

            // alert('GRID update Grid');

            // tslint:disable-next-line:max-line-length
            this.urlString = 'http://localhost:4518/api/CicliLanciati?lotto=' + this.inpCriteria.Lotto;
            this.urlString = this.urlString + '&data_da=' + this.inpCriteria.DataStart;
            this.urlString = this.urlString + '&data_a=' + this.inpCriteria.DataEnd;
            this.urlString = this.urlString + '&tipo_data=' + this.inpCriteria.TipoData;
            this.urlString = this.urlString + '&id_lega=' + this.inpCriteria.IdLega;
            this.urlString = this.urlString + '&id_forma=' + this.inpCriteria.IdForma;
            this.urlString = this.urlString + '&id_statociclo=' + this.inpCriteria.IdStatoCiclo;
            this.urlString = this.urlString + '&id_statofisico=' + this.inpCriteria.IdStatoFisico;
            this.urlString = this.urlString + '&id_cliente=' + this.inpCriteria.IdCliente;
            this.urlString = this.urlString + '&pressa=' + this.inpCriteria.Pressa;
            this.urlString = this.urlString + '&bLottiAperti=' + this.inpCriteria.LottiAperti;
            this.urlString = this.urlString + '&bLottiChiusi=' + this.inpCriteria.LottiChiusi;
            this.urlString = this.urlString + '&bRicercaCommessa=' + this.inpCriteria.Commessa;
            this.urlString = this.urlString + '&bRicercaMatricola=' + this.inpCriteria.Matricola;
            this.urlString = this.urlString + '&dimensione=' + this.inpCriteria.Dimensione;
            this.urlString = this.urlString + '&colata=' + this.inpCriteria.Colata;

            // alert(this.urlString);

            this.http
                .get(this.urlString)
                .subscribe(data => {
                  this.rowDataLoaded = data;
                  if ( this.rowDataLoaded.length > 0 ) {
                      this.rowData = this.rowDataLoaded;
                    }
                });
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

    printCerts() {
      this.lottiToGenerate = [];
      const rowsSelection = this.gridApi.getSelectedRows();

      rowsSelection.forEach(element => {
        this.lottiToGenerate.push(element.lotto);
      });

      console.log('PRINT CERTS : ' + this.lottiToGenerate);

      this.generateCerts.emit(this.lottiToGenerate);
    }


    showCriteria() {

      // console.log('GRID showCriteria');

      // console.log(this.inpCriteria.Lotto);
      // console.log(this.inpCriteria.IdStatoFisico);
      // console.log(this.inpCriteria.IdStatoCiclo);
      // console.log(this.inpCriteria.Pressa);
      // console.log(this.inpCriteria.IdCliente);
      // console.log(this.inpCriteria.IdForma);
      // console.log(this.inpCriteria.DataStart);
      // console.log(this.inpCriteria.DataEnd);

    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.gridApi.hideOverlay();

      // this.http
      //   .get('http://localhost:4518/api/Elementi?settore=2&tipo=5'
      //     // 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'
      //   )
      //   .subscribe(data => {
      //     this.rowData = data;
      //   });
    }

    onPageSizeChanged(newPageSize) {

      this.lottiToGenerate = [];
      const rowsSelection = this.gridApi.getSelectedRows();

      rowsSelection.forEach(element => {
        this.lottiToGenerate.push(element.lotto);
      });

      this.generateCerts.emit(this.lottiToGenerate);

    }
  }

