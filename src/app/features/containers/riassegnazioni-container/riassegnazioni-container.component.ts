import { Component, OnInit, Output, Input } from '@angular/core';
import { SearchCriteriaRiassegnazioni } from 'src/app/model/SearchCriteriaRiassegnazioni';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-riassegnazioni-container',
  templateUrl: './riassegnazioni-container.component.html',
  styleUrls: ['./riassegnazioni-container.component.scss']
})
export class RiassegnazioniContainerComponent implements OnInit {

  // tslint:disable-next-line:no-any
  rowData: any[];
  urlString: string;
  // tslint:disable-next-line:no-any
  rowDataLoaded: any;


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  loadData(inpCriteria: SearchCriteriaRiassegnazioni) {

      // alert('UPDATE GRID riassegnazioni component');
      // tslint:disable-next-line:max-line-length
      this.urlString = 'http://localhost:4518/api/RiAssegnazioniSMEA?';
      this.urlString = this.urlString + 'data_da=' + inpCriteria.DataStart;
      this.urlString = this.urlString + '&data_a=' + inpCriteria.DataEnd;
      this.urlString = this.urlString + '&commessa=' + inpCriteria.Commessa;
      this.urlString = this.urlString + '&elaborato=' + inpCriteria.Elaborato;

      // alert(this.urlString);

      this.http.get(this.urlString)
          .subscribe(data => {
            this.rowDataLoaded = data;
            if ( this.rowDataLoaded.length > 0 ) {
                this.rowData = this.rowDataLoaded;
                // console.log(this.rowData);
              }
          });
}

}
