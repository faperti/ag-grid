import { SearchCriteriaRiassegnazioni } from '../../../model/SearchCriteriaRiassegnazioni';

import { Component, OnInit, Input,  OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-search-riassegnazioni',
  templateUrl: './search-riassegnazioni.component.html',
  styleUrls: ['./search-riassegnazioni.component.scss']
})
export class SearchRiassegnazioniComponent implements OnInit {

  @Input() inpLotto: string;
  @Output() clickSearch = new EventEmitter<SearchCriteriaRiassegnazioni>();

  private strCliente: any = '';
  private criteria: SearchCriteriaRiassegnazioni;

  private test1 = new Date();

  private ngb = {
    year: this.test1.getUTCFullYear(),
    month: this.test1.getUTCMonth() + 1,
    day: this.test1.getUTCDate()
  };

  searchCriteriaForm = new FormGroup({
    searchCommessa: new FormControl(''),
    searchElaborato: new FormControl(false),
    dp1: new FormControl( this.ngb ),
    dp2: new FormControl( this.ngb ),
  });

  constructor( private commonService: CommonService ) {
  }

  ngOnInit() {
    this.searchCriteriaForm.valueChanges.subscribe( newValue => { console.log(newValue); } );
  }

  clickMe() {
    this.criteria = new SearchCriteriaRiassegnazioni();

    this.criteria.DataStart = this.commonService.format(this.searchCriteriaForm.controls.dp1.value);
    this.criteria.DataEnd = this.commonService.format(this.searchCriteriaForm.controls.dp2.value);
    this.criteria.Commessa = this.searchCriteriaForm.controls.searchCommessa.value;
    this.criteria.Elaborato = this.searchCriteriaForm.controls.searchElaborato.value;

    this.clickSearch.emit(this.criteria);
  }

  updateSearch() {
    alert('update Search!');
  }
}
