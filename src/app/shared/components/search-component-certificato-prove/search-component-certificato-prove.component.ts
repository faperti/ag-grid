import { Component, OnInit, Input,  OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Cliente } from '../../../model/cliente';
import { SearchCriteriaCertificatoProve } from 'src/app/model/SearchCriteriaCertificatoProve';


@Component({
  selector: 'app-search-certificato-prove-component',
  templateUrl: './search-component-certificato-prove.component.html',
  styleUrls: ['./search-component-certificato-prove.component.scss']
})

export class SearchCertificatoProveComponent implements OnInit, OnChanges {

  @Input() inpLotto: string;
  @Output() clickSearch = new EventEmitter<SearchCriteriaCertificatoProve>();

  private currentForma: any;
  currentCommessa: any;
  currentLotto: any;
  lotti: any;
  private currentLottiAperti: boolean;
  private currentLottiChiusi: boolean;

  private ricercaMatricola: boolean;
  private ricercaCommessa: boolean;

  private currentLega: any;
  private currentPressa: any;

  private currentCliente: Cliente = {id_cliente: '0', cod_cliente: '', des_cliente: '', visibile: true };

  private strCliente: any = '';
  private criteria: SearchCriteriaCertificatoProve;

  constructor(private data: DataService, private http: HttpClient) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  clickMe() {
    this.updateLotti();

    // this.criteria = new SearchCriteria();

    // if ( this.currentForma !== undefined ) {
    //   if ( this.currentForma.des_forma !== '') {
    //     this.criteria.IdForma = this.currentForma.id_forma;
    //   } else {
    //     this.criteria.IdForma = 0;
    //   }
    // } else {
    //   this.criteria.IdForma = 0;
    // }

    // if ( this.currentLega !== undefined ) {
    //   if ( this.currentLega.des_lega !== '' && this.currentLega !== null) {
    //     this.criteria.IdLega = this.currentLega.id_lega;
    //   } else {
    //     this.criteria.IdLega = 0;
    //   }
    // } else {
    //   this.criteria.IdLega = 0;
    // }


    // if ( this.currentPressa !== undefined ) {
    //   if ( this.currentPressa.pressa !== '' && this.currentPressa !== null) {
    //     this.criteria.Pressa = this.currentPressa.pressa;
    //     } else {
    //     this.criteria.Pressa = '';
    //   }
    // } else {
    //   this.criteria.Pressa = '';
    // }

    // console.log(this.currentCommessa);
    // this.clickSearch.emit(this.criteria);
  }

  clickCommessaLotto() {

    this.criteria = new SearchCriteriaCertificatoProve();
    this.criteria.Commessa = this.currentCommessa;
    this.criteria.Lotto = this.currentLotto.lotto;

    this.clickSearch.emit(this.criteria);
  }


  ngOnInit() {

    this.currentLottiAperti = false;
    this.currentLottiChiusi = false;

    this.ricercaCommessa = false;
    this.ricercaMatricola = false;

  }

updateLotti() {

  const url = 'http://localhost:4518/api/Commesse?commessa=' + this.currentCommessa;
  alert(url);

  this.http
  .get(url)
.subscribe(data => {
  // console.log(data);
  this.lotti = data;
});
}

updateSearch() {
  alert('update Search!');
}

}
