import { Component, OnInit, Input,  OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Cliente } from '../../../model/cliente';
import { SearchCriteria } from '../../../model/searchCriteria';

import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-shared.component.html',
  styleUrls: ['./search-shared.component.scss']
})

export class SearchComponentComponent implements OnInit, OnChanges {

  @Input() inpLotto: string;
  @Input() statoData: any[];
  @Input() formeData: any[];
  @Input() legheData: any[];
  @Input() presseData: any[];
  @Input() statiCicloData: any[];
  @Input() statiFisiciData: any[];
  @Output() clickSearch = new EventEmitter<any>();
  @Output() stopLoading = new EventEmitter<any>();

  private clientiData: any;
  private clientiDataLoaded: Cliente[];

  // private Data1: any;
  // private Data2: any;
  private currentItem: any;
  private currentLotto = '';
  private currentDataDa: any;
  private currentDataA: any;
  private currentTipoData = 'ESTRUSIONE';
  private currentColata = '';
  private currentDimensione = '';

  private currentForma: any;
  private currentLottiAperti: boolean;
  private currentLottiChiusi: boolean;

  private errorMessage: string;
  private ricercaMatricola: boolean;
  private ricercaCommessa: boolean;
  private uploadCounter = 0;

  private currentLega: any;
  private currentPressa: any;
  private currentStatoFisico: any;
  private currentStatoCiclo: any;
  private currentCliente: Cliente = {id_cliente: '0', cod_cliente: '', des_cliente: '', visibile: true };

  private strCliente: any = '';
  private criteria: SearchCriteria;

  private test1 = new Date();

  private ngb = {
    year: this.test1.getUTCFullYear(),
    month: this.test1.getUTCMonth() + 1,
    day: this.test1.getUTCDate()
  };

  // private searchCriteriaForm = new FormGroup({
  //   dp1: new FormControl( this.ngb ),
  //   dp2: new FormControl( this.ngb )
  // });



 private searchCriteriaForm = new FormGroup({
    statoData: new FormControl( this.currentTipoData ),
    formeData: new FormControl(''),
    legheData: new FormControl(''),
    presseData: new FormControl(''),
    statiFisiciData: new FormControl(''),
    statiCicloData: new FormControl(''),
    ricercaClienti: new FormControl(''),
    clientiData: new FormControl(''),
    searchLotto: new FormControl(''),
    searchColata: new FormControl(''),
    searchDimensione: new FormControl(''),
    dp1: new FormControl( this.ngb ),
    dp2: new FormControl( this.ngb ),
    searchLottiAperti: new FormControl(false),
    searchLottiChiusi: new FormControl(false),
    searchCommessa: new FormControl(false),
    searchMatricola: new FormControl(false)
  });

constructor(
  public data: DataService,
  private http: HttpClient,
  private commonService: CommonService
  ) {
  this.currentStatoFisico = { id_statofisico: 47, cod_statofisico: '', des_statofisico: '', visibile: false };

}

  ngOnChanges(changes: SimpleChanges) {
  }

  clickMe() {
    console.log('CLICK ME');
    this.errorMessage = '';
    this.criteria = new SearchCriteria();

    // console.log('DATA 1 : ' + this.Data1);
    // console.log('DATA 2 : ' + this.Data2);

    // if ( this.currentDataDa === null || this.currentDataDa === undefined ) {
    //   this.errorMessage += 'Campo Data Da obbligatorio';
    // }

    // if ( this.currentDataA === null || this.currentDataA === undefined ) {
    //   this.errorMessage += 'Campo Data A obbligatorio';
    // }

    // console.log('LOG');
    // console.log(this.currentDataDa);
    // console.log(this.currentDataA);

    // console.log(this.format(this.currentDataDa));
    // console.log(this.format(this.currentDataDa));

    console.log(this.searchCriteriaForm.controls.formeData);

    if  (this.searchCriteriaForm.controls.formeData.value.cod_forma !== undefined) {
      if ( this.searchCriteriaForm.controls.formeData.value.des_forma !== '' ) {
        this.criteria.IdForma = this.searchCriteriaForm.controls.formeData.value.id_forma;
      } else {
        this.criteria.IdForma = 0;
      }
    } else {
      this.criteria.IdForma = 0;
    }


    // if ( this.currentForma !== undefined ) {
    //   if ( this.currentForma.des_forma !== '') {
    //     this.criteria.IdForma = this.currentForma.id_forma;
    //   } else {
    //     this.criteria.IdForma = 0;
    //   }
    // } else {
    //   this.criteria.IdForma = 0;
    // }

    if (this.searchCriteriaForm.controls.legheData.value.cod_lega !== undefined) {
      if ( this.searchCriteriaForm.controls.legheData.value.des_lega !== '' ) {
        this.criteria.IdLega = this.searchCriteriaForm.controls.legheData.value.id_lega;
      } else {
        this.criteria.IdLega = 0;
      }
    } else {
      this.criteria.IdLega = 0;
    }



    // if ( this.currentLega !== undefined ) {
    //   if ( this.currentLega.des_lega !== '' && this.currentLega !== null) {
    //     this.criteria.IdLega = this.currentLega.id_lega;
    //   } else {
    //     this.criteria.IdLega = 0;
    //   }
    // } else {
    //   this.criteria.IdLega = 0;
    // }

    if (this.searchCriteriaForm.controls.presseData.value.cod_pressa !== undefined) {
      if ( this.searchCriteriaForm.controls.presseData.value.des_pressa !== '' ) {
        this.criteria.Pressa = this.searchCriteriaForm.controls.presseData.value.des_pressa;
      } else {
        this.criteria.Pressa = '';
      }
    } else {
      this.criteria.Pressa = '';
    }

    // if ( this.currentPressa !== undefined ) {
    //   if ( this.currentPressa.pressa !== '' && this.currentPressa !== null) {
    //     this.criteria.Pressa = this.currentPressa.pressa;
    //     } else {
    //     this.criteria.Pressa = '';
    //   }
    // } else {
    //   this.criteria.Pressa = '';
    // }

    if (this.searchCriteriaForm.controls.statiCicloData.value.cod_statociclo !== undefined) {
      if ( this.searchCriteriaForm.controls.statiCicloData.value.des_statociclo !== '' ) {
        this.criteria.IdStatoCiclo = this.searchCriteriaForm.controls.statiCicloData.value.id_statociclo;
      } else {
        this.criteria.IdStatoCiclo = 0;
      }
    } else {
      this.criteria.IdStatoCiclo = 0;
    }

    // if ( this.currentStatoCiclo !== undefined ) {
    //   if ( this.currentStatoCiclo.des_statociclo !== '') {
    //     this.criteria.IdStatoCiclo = this.currentStatoCiclo.id_statociclo;
    //   } else {
    //     this.criteria.IdStatoCiclo = 0;
    //   }
    // } else {
    //   this.criteria.IdStatoCiclo = 0;
    // }

    if (this.searchCriteriaForm.controls.statiFisiciData.value.cod_statofisico !== undefined) {
      if ( this.searchCriteriaForm.controls.statiFisiciData.value.des_statofisico !== '' ) {
        this.criteria.IdStatoFisico = this.searchCriteriaForm.controls.statiFisiciData.value.id_statofisico;
      } else {
        this.criteria.IdStatoFisico = 0;
      }
    } else {
      this.criteria.IdStatoFisico = 0;
    }

    // if ( this.currentStatoFisico !== undefined ) {
    //   if ( this.currentStatoFisico.des_statofisico !== '') {
    //     this.criteria.IdStatoFisico = this.currentStatoFisico.id_statofisico;
    //   } else {
    //     this.criteria.IdStatoFisico = 0;
    //   }
    // } else {
    //   this.criteria.IdStatoFisico = 0;
    // }

    if (this.searchCriteriaForm.controls.clientiData.value.id_cliente !== undefined) {
      if ( this.searchCriteriaForm.controls.clientiData.value.des_cliente !== '' ) {
        this.criteria.IdCliente = this.searchCriteriaForm.controls.clientiData.value.id_cliente;
      } else {
        this.criteria.IdCliente = 0;
      }
    } else {
      this.criteria.IdCliente = 0;
    }

    this.criteria.TipoData = this.searchCriteriaForm.controls.statoData.value;
    this.criteria.Lotto = this.searchCriteriaForm.controls.searchLotto.value;

    // console.log( this.searchCriteriaForm.controls.dp1.value );

    this.criteria.DataStart = this.commonService.format(this.searchCriteriaForm.controls.dp1.value);
    this.criteria.DataEnd = this.commonService.format(this.searchCriteriaForm.controls.dp2.value);

    console.log(this.criteria.DataStart);
    console.log(this.criteria.DataEnd);

    // console.log('CLICK ME');

    // console.log( (this.searchCriteriaForm.controls.dp1.value as NgbDateStruct).year);
    // console.log(this.searchCriteriaForm.controls.dp2.value);

    // console.log(this.format(this.searchCriteriaForm.controls.dp1.value));
    // console.log(this.format(this.searchCriteriaForm.controls.dp2.value));

    this.criteria.Colata = this.searchCriteriaForm.controls.searchColata.value;
    this.criteria.Dimensione = this.searchCriteriaForm.controls.searchDimensione.value;

    this.criteria.LottiAperti = this.searchCriteriaForm.controls.searchLottiAperti.value;
    this.criteria.LottiChiusi = this.searchCriteriaForm.controls.searchLottiChiusi.value;

    this.criteria.Commessa = this.searchCriteriaForm.controls.searchCommessa.value;
    this.criteria.Matricola = this.searchCriteriaForm.controls.searchMatricola.value;

    // console.log(this.criteria);

    if ( this.errorMessage === '') {
      this.clickSearch.emit(this.criteria);
    }
  }

  ngOnInit() {

    this.currentStatoFisico = { id_statofisico: 47, cod_statofisico: '', des_statofisico: '', visibile: false };

    // tslint:disable-next-line:max-line-length
    this.currentStatoCiclo = { id_statociclo: 47, cod_statociclo: '' , des_statociclo: '', des_forma_cliente: null, visibile: false, id_statofisico: null };

    // this.searchCriteriaForm.controls.statoData.setValue('ESTRUSIONE');

    // this.updateClienti();

    this.currentLottiAperti = false;
    this.currentLottiChiusi = false;

    this.ricercaCommessa = false;
    this.ricercaMatricola = false;

    this.searchCriteriaForm.valueChanges.subscribe(newValue => {
      return console.log(newValue);
    });

    this.searchCriteriaForm.statusChanges.subscribe(newStatus => console.log(newStatus));
    // console.log(this.searchCriteriaForm.value);
    // console.log(this.searchCriteriaForm.valid);
    this.searchCriteriaForm.controls.ricercaClienti.valueChanges.subscribe( x => this.updateClienti(x) );

  }

  updateClienti(searchValue: string) {

    console.log(searchValue);

    if (searchValue.length > 1) {
    this.http
    .get('http://localhost:4518/api/Clienti?sLookUpString=' + searchValue)
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

    if (this.currentCliente !== undefined && this.currentCliente.id_cliente !== '') {
        this.data.Cliente = this.currentCliente.id_cliente;
      } else {
        this.data.Cliente = '0';
      }

    // this.data.changeMessage('AGGIORNA');

}

updateSearch() {
  alert('update Search!');
}

}
