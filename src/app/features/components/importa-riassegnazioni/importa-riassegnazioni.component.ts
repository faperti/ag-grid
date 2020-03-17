import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from '../../../model/SearchCriteriaRiassegnazioni';
import { DataService } from '../../../shared/services/data.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-importa-riassegnazioni',
  templateUrl: './importa-riassegnazioni.component.html',
  styleUrls: ['./importa-riassegnazioni.component.scss']
})
export class ImportaRiassegnazioniComponent implements OnInit {

  @Input() emptyData: boolean;
  @Input() gridData: any[];
  @Output() clickSearch: EventEmitter<SearchCriteriaRiassegnazioni> = new EventEmitter<SearchCriteriaRiassegnazioni>();

  private lt: string;
  private myLotto: string;
  private criteriaToGrid: SearchCriteriaRiassegnazioni;
  private searchCriteriaForma: FormGroup;

  constructor( ) {
    console.log('constructor importa riassegnazioni ');
    console.log(this.emptyData);
  }

  ngOnInit() {
    this.criteriaToGrid = new SearchCriteriaRiassegnazioni();
    this.criteriaToGrid.DataStart = '';
    this.criteriaToGrid.DataEnd = '';
    this.criteriaToGrid.Commessa = '';
    this.criteriaToGrid.Elaborato = '';
  }

  updateMyGrid(value: SearchCriteriaRiassegnazioni) {
    this.emptyData = false;
    this.gridData = undefined;
    this.clickSearch.emit(value);
  }
}
