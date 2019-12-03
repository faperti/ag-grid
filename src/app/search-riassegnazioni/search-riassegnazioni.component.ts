import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-riassegnazioni',
  templateUrl: './search-riassegnazioni.component.html',
  styleUrls: ['./search-riassegnazioni.component.scss']
})
export class SearchRiassegnazioniComponent implements OnInit {

  @Input() inpLotto: string;
  @Output() clickSearch = new EventEmitter<SearchCriteriaRiassegnazioni>();

  private currentDataDa = '';
  private currentDataA = '';
  private currentCommessa = '';
  private currentElaborato = '';

  private currentLottiAperti: boolean;
  private currentLottiChiusi: boolean;

  private ricercaMatricola: boolean;
  private ricercaCommessa: boolean;

  private strCliente: any = '';
  private criteria: SearchCriteriaRiassegnazioni;

  constructor(private http: HttpClient) {

  }

  clickMe() {
    this.criteria = new SearchCriteriaRiassegnazioni();

    this.criteria.DataStart = this.currentDataDa;
    this.criteria.DataEnd = this.currentDataA;
    this.criteria.Commessa = this.currentCommessa;
    this.criteria.Elaborato = this.currentElaborato;

    this.clickSearch.emit(this.criteria);
  }

  ngOnInit() {

    // this.clickMe();

  }

//   updateClienti() {

//     this.data.lotto = this.currentLotto;
//     this.data.dataDa = this.currentDataDa;
//     this.data.dataA = this.currentDataA;

//     // this.data.changeMessage('AGGIORNA');

// }

updateSearch() {
  alert('update Search!');
}

}
