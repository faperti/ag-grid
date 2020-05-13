import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from '../../../model/SearchCriteriaRiassegnazioni';
import { DataService } from '../../../shared/services/data.service';
import { FormGroup } from '@angular/forms';
import { Dettaglio } from '../../containers/importa-riassegnazioni-container/model/importaVariazioni';

@Component({
  selector: 'app-importa-riassegnazioni',
  templateUrl: './importa-riassegnazioni.component.html',
  styleUrls: ['./importa-riassegnazioni.component.scss']
})
export class ImportaRiassegnazioniComponent implements OnInit {

  @Input() emptyData: boolean;
  // tslint:disable-next-line:no-any
  @Input() gridData: any[];
  @Input() showGrid: boolean;
  @Input() dettagliImportazione: Dettaglio[];
  @Output() clickSearch: EventEmitter<SearchCriteriaRiassegnazioni> = new EventEmitter<SearchCriteriaRiassegnazioni>();
  @Output() impVariazioni: EventEmitter<string[]> = new EventEmitter<string[]>();

  private lt: string;
  private myLotto: string;
  criteriaToGrid: SearchCriteriaRiassegnazioni;
  private searchCriteriaForma: FormGroup;
  loading: boolean;

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
    this.showGrid = true;
    this.gridData = null;
    this.clickSearch.emit(value);
  }

  importVariazioni(value: string[]) {
    console.log('IMPORT VARIAZIONI : ' + value );
    this.impVariazioni.emit(value);
  }

}
