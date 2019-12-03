import { Component, OnInit, Input,  OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Cliente } from '../model/cliente';
import { SearchCriteria } from '../model/searchCriteria';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})

export class SearchComponentComponent implements OnInit, OnChanges {

  @Input() inpLotto: string;
  @Output() clickSearch = new EventEmitter<SearchCriteria>();

  private statoData: any;
  private formeData: any;
  private legheData: any;
  private presseData: any;
  private statiCicloData: any;
  private statiFisiciData: any;
  private clientiData: any;
  private clientiDataLoaded: Cliente[];

  private currentItem: any;
  private currentLotto = '';
  private currentDataDa = '';
  private currentDataA = '';
  private currentTipoData = 'ESTRUSIONE';
  private currentColata = '';
  private currentDimensione = '';

  private currentForma: any;
  private currentLottiAperti: boolean;
  private currentLottiChiusi: boolean;

  private ricercaMatricola: boolean;
  private ricercaCommessa: boolean;

  private currentLega: any;
  private currentPressa: any;
  private currentStatoFisico: any;
  private currentStatoCiclo: any;
  private currentCliente: Cliente = {id_cliente: '0', cod_cliente: '', des_cliente: '', visibile: true };

  private strCliente: any = '';
  private criteria: SearchCriteria;

  constructor(private data: DataService, private http: HttpClient) {

  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(' VALORE CORRENTE : ' + changes.inpLotto.currentValue);
    console.log(' VALORE PRECEDENTE : ' + changes.inpLotto.previousValue);
  }

  clickMe() {
    this.criteria = new SearchCriteria();

    if ( this.currentForma !== undefined ) {
      if ( this.currentForma.des_forma !== '') {
        this.criteria.IdForma = this.currentForma.id_forma;
      } else {
        this.criteria.IdForma = 0;
      }
    } else {
      this.criteria.IdForma = 0;
    }

    if ( this.currentLega !== undefined ) {
      if ( this.currentLega.des_lega !== '' && this.currentLega !== null) {
        this.criteria.IdLega = this.currentLega.id_lega;
      } else {
        this.criteria.IdLega = 0;
      }
    } else {
      this.criteria.IdLega = 0;
    }


    if ( this.currentPressa !== undefined ) {
      if ( this.currentPressa.pressa !== '' && this.currentPressa !== null) {
        this.criteria.Pressa = this.currentPressa.pressa;
        } else {
        this.criteria.Pressa = '';
      }
    } else {
      this.criteria.Pressa = '';
    }

    if ( this.currentStatoCiclo.des_statociclo !== '') {
      this.criteria.IdStatoCiclo = this.currentStatoCiclo.id_statociclo;
    } else {
      this.criteria.IdStatoCiclo = 0;
    }

    if ( this.currentStatoFisico.des_statofisico !== '') {
      this.criteria.IdStatoFisico = this.currentStatoFisico.id_statofisico;
    } else {
      this.criteria.IdStatoFisico = 0;
    }

    // alert(this.currentTipoData);

    this.criteria.TipoData = this.currentTipoData;
    this.criteria.IdCliente = this.currentCliente.id_cliente;
    this.criteria.Lotto = this.currentLotto;
    this.criteria.DataStart = this.currentDataDa;
    this.criteria.DataEnd = this.currentDataA;
    this.criteria.Colata = this.currentColata;
    this.criteria.Dimensione = this.currentDimensione;

    this.criteria.LottiAperti = this.currentLottiAperti;
    this.criteria.LottiChiusi = this.currentLottiChiusi;

    this.criteria.Commessa = this.ricercaCommessa;
    this.criteria.Matricola = this.ricercaMatricola;

    this.clickSearch.emit(this.criteria);
  }

  ngOnInit() {
    // this.currentLottiAperti = false;
    // this.currentLottiChiusi = false;

    this.updateStatoData();

    this.updateLeghe();

    this.updateForme();

    this.updatePresse();

    this.updateStatiCiclo();

    this.updateStatiFisici();

    // this.updateClienti();

    this.currentLottiAperti = false;
    this.currentLottiChiusi = false;

    this.ricercaCommessa = false;
    this.ricercaMatricola = false;

  }

  updateClienti() {

    if (this.strCliente.length > 1) {
    this.http
    .get('http://localhost:4518/api/Clienti?sLookUpString=' + this.strCliente)
    .subscribe(data => {
      this.clientiDataLoaded = data as Cliente[];
      if ( this.clientiDataLoaded.length > 0 ) {
        this.clientiData = this.clientiDataLoaded;
        this.currentCliente = this.clientiDataLoaded[0];
      } else {
        this.currentCliente.id_cliente = '0';
      }
  });
}

    this.data.lotto = this.currentLotto;
    this.data.dataDa = this.currentDataDa;
    this.data.dataA = this.currentDataA;

    if (this.currentStatoFisico.des_statofisico !== '') {
        this.data.StatoFisico = this.currentStatoFisico.id_statofisico;
      } else {
        this.data.StatoFisico = '';
      }

    if (this.currentStatoCiclo.des_statociclo !== '') {
        this.data.StatoCiclo = this.currentStatoCiclo.id_statociclo;
      } else {
        this.data.StatoCiclo = '';
      }

    if (this.currentCliente.id_cliente !== '') {
        this.data.Cliente = this.currentCliente.id_cliente;
      } else {
        this.data.Cliente = '0';
      }

    // this.data.changeMessage('AGGIORNA');

}

updateStatiFisici() {
  this.http
  .get('http://localhost:4518/api/StatoFisico')
    .subscribe(data => {
      this.statiFisiciData = data;
      this.currentStatoFisico = data[0];
    });
}

updateStatiCiclo() {
  this.http
  .get('http://localhost:4518/api/StatoCiclo')
    .subscribe(data => {
   this.statiCicloData = data;
   this.currentStatoCiclo = data[0];
  });
}

updatePresse() {
  this.http
  .get('http://localhost:4518/api/Presse')
.subscribe(data => {
this.presseData = data;
});
}

updateLeghe() {
  this.http
  .get('http://localhost:4518/api/Leghe')
.subscribe(data => {
this.legheData = data;
});
}

updateStatoData() {
  this.statoData = ['TRAZIONE', 'ANALISI', 'ESTRUSIONE', 'LANCIO'];
}

updateForme() {
  this.http
  .get('http://localhost:4518/api/Forme')
.subscribe(data => {
  this.formeData = data;
});
}

updateSearch() {
  alert('update Search!');
}

}
