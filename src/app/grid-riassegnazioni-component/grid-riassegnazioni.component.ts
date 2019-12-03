import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';
import { RouterLinkRendererComponent } from '../router-link-renderer/router-link-renderer.component';

@Component({
  selector: 'app-grid-riassegnazioni-component',
  templateUrl: './grid-riassegnazioni.component.html',
  styleUrls: ['./grid-riassegnazioni.component.scss']
})
export class GridRiassegnazioniComponent implements OnInit, OnChanges {

  @Input() inpCriteria: SearchCriteriaRiassegnazioni;
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
          field: 'commessaDa',
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
          headerName: '# SMEA',
          field: 'id_SMEA',
          width: 90
        },
        {
          headerName: 'Elaborato',
          field: 'elaborato',
          resizable: true,
          valueFormatter: this.elaboratoFormatter,
          width: 90
        },
        // {
        //   headerName: 'data_elaborazione',
        //   field: 'data_elaborazione',
        //   width: 90
        // },
        // {
        //   headerName: 'Lotto ODV',
        //   field: 'lotto_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'num_ord_odv',
        //   field: 'num_ord_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'Posizione',
        //   field: 'posizione_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'id_cliente_odv',
        //   field: 'id_cliente_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'des_cliente_odv',
        //   field: 'des_cliente_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'ordine_cliente_odv',
        //   field: 'ordine_cliente_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'id_tipocertificato_odv',
        //   field: 'id_tipocertificato_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'des_tipocertificato_odv',
        //   field: 'des_tipocertificato_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'id_normativa_odv',
        //   field: 'id_normativa_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'des_normativa_odv',
        //   field: 'des_normativa_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'kg_ordinati_odv',
        //   field: 'kg_ordinati_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'kg_assegnati_odv',
        //   field: 'kg_assegnati_odv',
        //   width: 90
        // },
        // {
        //   headerName: 'Certificato',
        //   cellRenderer: this.certificatoRenderer,
        //   // valueGetter: this.certificatoGetter,
        //   // valueFormatter: this.certificatoFormatter,
        //   // field: 'certificato',
        //   width: 100
        // }
      ];
      this.defaultColDef = {
        sortable: true,
        filter: true
      };
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges() {
      alert('grid riassegnazioni component: ONCHANGES');

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
            alert('UPDATE GRID riassegnazioni component');
            // tslint:disable-next-line:max-line-length
            this.urlString = 'http://localhost:4518/api/RiAssegnazioniSMEA?';
            this.urlString = this.urlString + 'data_da=' + this.inpCriteria.DataStart;
            this.urlString = this.urlString + '&data_a=' + this.inpCriteria.DataEnd;
            this.urlString = this.urlString + '&commessa=' + this.inpCriteria.Commessa;
            this.urlString = this.urlString + '&elaborato=' + this.inpCriteria.Elaborato;

            alert(this.urlString);

            this.http
                .get(this.urlString)
                .subscribe(data => {
                  this.rowDataLoaded = data;
                  if ( this.rowDataLoaded.length > 0 ) {
                      this.rowData = this.rowDataLoaded;
                      console.log(this.rowData);
                    }
                });
    }



    ngOnInit() {
      this.inpCriteria = new SearchCriteriaRiassegnazioni();
      this.inpCriteria.DataStart = '';
      this.inpCriteria.DataEnd = '';
      this.inpCriteria.Commessa = '';
      this.inpCriteria.Elaborato = '';

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

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.gridApi.hideOverlay();
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

