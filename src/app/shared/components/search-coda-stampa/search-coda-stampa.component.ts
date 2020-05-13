import { SearchCriteriaCodaStampa } from '../../../model/SearchCriteriaCodaStampa';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-search-coda-stampa',
  templateUrl: './search-coda-stampa.component.html',
  styleUrls: ['./search-coda-stampa.component.scss']
})
export class SearchCodaStampaComponent implements OnInit {

  @Output() clickSearch = new EventEmitter<SearchCriteriaCodaStampa>();
  @Input() inpLotto: string;

  private criteria: SearchCriteriaCodaStampa;
  private test1 = new Date();

  private ngb = {
    year: this.test1.getUTCFullYear(),
    month: this.test1.getUTCMonth() + 1,
    day: this.test1.getUTCDate()
  };

  searchCriteriaForm = new FormGroup({
    dp1: new FormControl( this.ngb ),
    dp2: new FormControl( this.ngb )
  });

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  clickMe() {
    this.criteria = new SearchCriteriaCodaStampa();

    this.criteria.DataStart = this.commonService.format(this.searchCriteriaForm.controls.dp1.value);
    this.criteria.DataEnd = this.commonService.format(this.searchCriteriaForm.controls.dp2.value);

    this.clickSearch.emit(this.criteria);
  }
}
