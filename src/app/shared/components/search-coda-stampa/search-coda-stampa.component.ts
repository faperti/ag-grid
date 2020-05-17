import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { SearchCriteriaCodaGenerazioneCertificati } from 'src/app/model/SearchCriteriaCodaGenerazioneCertificati';

@Component({
  selector: 'app-search-coda-stampa',
  templateUrl: './search-coda-stampa.component.html',
  styleUrls: ['./search-coda-stampa.component.scss']
})
export class SearchCodaStampaComponent implements OnInit {

  @Output() clickSearch = new EventEmitter<SearchCriteriaCodaGenerazioneCertificati>();
  @Input() inpLotto: string;

  private criteria: SearchCriteriaCodaGenerazioneCertificati;
  private test1 = new Date();

  tipoAccodamento = [ {valore: -1, Descrizione: 'Tutti' },
  {valore: 0, Descrizione: 'Standard' },
  {valore: 1, Descrizione: 'Test 1' },
  {valore: 2, Descrizione: 'Test 2' }
   ];

  private ngb = {
    year: this.test1.getUTCFullYear(),
    month: this.test1.getUTCMonth() + 1,
    day: this.test1.getUTCDate()
  };

  searchCriteriaForm = new FormGroup({
    dp1: new FormControl( this.ngb ),
    dp2: new FormControl( this.ngb ),
    tipo: new FormControl( -1 )
  });

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  clickMe() {
    this.criteria = new SearchCriteriaCodaGenerazioneCertificati();

    this.criteria.DataStart = this.commonService.format(this.searchCriteriaForm.controls.dp1.value);
    this.criteria.DataEnd = this.commonService.format(this.searchCriteriaForm.controls.dp2.value);
    this.criteria.Tipo = this.searchCriteriaForm.controls.tipo.value;

    this.clickSearch.emit(this.criteria);
  }
}
