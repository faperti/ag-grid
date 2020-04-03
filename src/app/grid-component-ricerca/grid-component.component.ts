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
  @Input() gridRowData: any[];
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  private gridPageSize = 10;
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
            inRouterLink: '/qualita/lotto'
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
          field: 'pathCertificato',
          width: 300,
          cellRenderer: this.certificatoRenderer
        },
        // {
        //   headerName: 'Certificato', field: 'lotto',
        //   cellRendererFramework: RouterLinkRendererComponent,
        //   cellRendererParams: {
        //     inRouterLink: '/qualita/parent1'
        //   },
        //   // cellRenderer: this.certificatoRenderer,
        //   // // valueGetter: this.certificatoGetter,
        //   // // valueFormatter: this.certificatoFormatter,
        //   // // field: 'certificato',
        //   width: 100
        // },
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

      // console.log(' VALORE CORRENTE : ' + changes.inpCriteria.currentValue);
      // console.log(' VALORE PRECEDENTE : ' + changes.inpCriteria.previousValue);

      // this.showCriteria();

      this.updateGrid();
    }

    updateGrid() {

      this.rowData = this.gridRowData;

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
      // // tslint:disable-next-line:prefer-const
      // let cert = '<A href="' + params.data.pathCertificato + '"><img border="0" width="32" height="32"' +
      // ' src="/assets/images/' +
      // params.data.imgCertificato + '"></img></A>';

      // tslint:disable-next-line:max-line-length
      const cert = '<A target="_blank" href="' + 'assets/certificati/' + params.data.lotto + '.pdf"><i class="fa fa-paperclip" aria-hidden="true"></i></img>' + params.data.lotto + '</A>';
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

    onPageSizeChanged() {

      console.log(this.gridPageSize);
      this.gridApi.paginationSetPageSize(Number(this.gridPageSize));

      // this.lottiToGenerate = [];
      // const rowsSelection = this.gridApi.getSelectedRows();

      // rowsSelection.forEach(element => {
      //   this.lottiToGenerate.push(element.lotto);
      // });

      // this.generateCerts.emit(this.lottiToGenerate);
    }
  }

