import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-lottoclienti',
  templateUrl: './lottoclienti.component.html',
  styleUrls: ['./lottoclienti.component.scss']
})
export class LottoclientiComponent implements OnInit {

  @Input() lotto = '';
  @Output() generateCerts = new EventEmitter<string[]>();

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: any;
  private rowDataLoaded: any;
  private message = '';
  private urlString = '';
  private variazioniToGenerate: any[];
  private variazioniResults: string[];
  private variazioniReady: boolean;
  private showVariazioni: boolean;


    constructor(private http: HttpClient) {
      this.columnDefs = [
        {
          headerName: 'Commessa',
          field: 'commessa',
          width: 100
        },
        {
          headerName: 'Ordine cliente',
          field: 'ordine_cliente',
          width: 110
        },
        {
          headerName: 'Cod. Cliente',
          field: 'cod_cliente',
          width: 110
        },
        {
          headerName: 'Descrizione',
          field: 'descrizione',
          width: 110
        },
        {
          headerName: 'Normativa',
          field: 'des_normativa',
          width: 110
        },
        {
          headerName: 'Certificato',
          field: 'des_tipocertificato',
          width: 110
        },
        {
          headerName: 'KgOrdinati',
          field: 'kg_ordinati',
          width: 110
        },
        {
          headerName: 'KgAssegnati',
          field: 'kg_assegnati',
          width: 110
        },
        {
          headerName: 'Note',
          field: 'note',
          width: 110
        },
      ];
      this.defaultColDef = {
        sortable: true,
        filter: true
      };
}

ngOnInit() {
  this.lotto = '1812050025';
  // tslint:disable-next-line:max-line-length
  this.urlString = 'http://localhost:4518/api/CicliLanciatiClienti?lotto=' + this.lotto;

  // alert(this.urlString);

  this.http
  .get(this.urlString)
  .subscribe(data => {
    this.rowData = data;
});
}

}
