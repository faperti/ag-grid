import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

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
  // tslint:disable-next-line:no-any
  @Input() gridRowData: any[];
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  gridPageSize = 10;
  columnDefs;
  defaultColDef;
  // tslint:disable-next-line:no-any
  rowData: any;
  // tslint:disable-next-line:no-any
  private rowDataLoaded: any;
  message = '';
  private urlString = '';
  private lottiToGenerate: string[];

  private widthData = 120;

    constructor(private http: HttpClient) {
      this.columnDefs = [
        {
          headerName: 'Lotto', field: 'lotto',
          width: 130,
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
          width: 60
        },
        {
          headerName: 'SF',
          field: 'des_statofisico',
          width: 60
        },
        {
          headerName: 'Richiesta',
          field: 'richiesta',
          width: 100
        },
        {
          headerName: 'Lancio',
          field: 'datalancio',
          width: this.widthData
        },
        {
          headerName: 'Chiusura',
          field: 'data_chiusura',
          width: this.widthData
        },
        {
          headerName: 'Certificato',
          // field: 'data_chiusura',
          // field: 'pathCertificato',
          width: 150,
          cellRenderer: this.certificatoRenderer.bind(this),
          cellStyle: { 'text-align': 'center' }
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
          width: 120
        },
        {
          headerName: 'Estrusione',
          field: 'data_estrusione_str',
          width: this.widthData
        },
        {
          headerName: 'Trazione',
          field: 'data_trazione_str',
          width: this.widthData
        },
        {
          headerName: 'Tempra',
          field: 'data_tempra_str',
          width: this.widthData
        },
        {
          headerName: 'Analisi',
          field: 'data_analisi_str',
          width: this.widthData
        },
        {
          headerName: 'Selezione',
          width: 100,
          // headerCheckboxSelection: false,
          checkboxSelection: true,
          // cellRenderer: this.selezioneRenderer.bind(this),
          cellStyle: {
            'text-align': 'center'
            }
        }
      ];
      this.defaultColDef = {
        sortable: true,
        filter: true
      };
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {
      this.updateGrid();
    }

    updateGrid() {

      this.rowData = this.gridRowData;

    }



    ngOnInit() {
      // this.showCriteria();
    }

    selezioneRenderer(params) {
      // tslint:disable-next-line:max-line-length
      const selezione = '<input type="checkbox"/>';
      return selezione;
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
      // tslint:disable-next-line:max-line-length
      const cert = '<a target="_blank" href="' + 'http://archiviocertificati.eural.com/' + this.makePathLotto(params) + '"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>';

      return cert;
    }





    // tslint:disable-next-line:no-any
    makePathLotto(params: any): string {
      const lottoVar = params.data.lotto;

      const lottoPath = '20' + lottoVar.substr(0, 2) + '/' + lottoVar.substr(4, 2) + '/' + lottoVar + '.pdf';
      // const lottoPath = '20' + lottoVar.substr(0, 2) + '/' + lottoVar.substr(4, 2) + '/' + lottoVar.substr(6, 2) + '/' + lottoVar + '.pdf';

      return lottoPath;
    //   if ( params !== null && params !== undefined ) {
    //   console.log(params.data);
    // //   if ( lotto !== undefined && lotto.length === 10 ){
    // //     return lotto.substr(0, 4) + '/' + lotto.substr(4, 2) + '/' + lotto.substr(6, 2) + '/' + lotto + '.pdf';
    // // } else {
    //   // return params.data.lotto;
    //  }
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

