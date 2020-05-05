import { Component, OnInit, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { RicercaContainerDataService } from './services/ricerca-container-data.service';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';

@Component({
  selector: 'app-ricerca-container',
  templateUrl: './ricerca-container.component.html',
  styleUrls: ['./ricerca-container.component.scss']
})
export class RicercaContainerComponent implements OnInit, AfterViewInit {

  // @Input() inpCriteria: SearchCriteria;

  urlString = '';
  title = 'title to display';
  content = 'content to display';
  // tslint:disable-next-line:no-any
  rowDataLoaded: any;
  // tslint:disable-next-line:no-any
  myRowData: any;
  inpCriteria: SearchCriteria;
  loading: boolean;
  emptyData: boolean;
// tslint:disable-next-line:no-any
  statoData: any;
  // tslint:disable-next-line:no-any
  formeData: any;
  // tslint:disable-next-line:no-any
  legheData: any;
  // tslint:disable-next-line:no-any
  presseData: any;
  // tslint:disable-next-line:no-any
  statiCicloData: any;
  // tslint:disable-next-line:no-any
  statiFisiciData: any;
  showGrid: boolean;
  uploadCounter = 0;

  constructor(private http: HttpClient, private ds: DataService, public rs: RicercaContainerDataService) {
    this.urlString = '';
  }

  ngOnInit() {
    console.log('NG INIT');
    this.loading = true;
    this.showGrid = false;
    this.emptyData = false;

    this.updateStatoData();
    this.updateLeghe();
    this.updateForme();
    this.updatePresse();
    this.updateStatiCiclo();
    this.updateStatiFisici();
  }

  ngAfterViewInit() {

    if ( this.rs.lastSearchCriteria !== null &&
      this.rs.lastSearchCriteria !== undefined ) {
        this.inpCriteria = this.rs.lastSearchCriteria;
        this.searchGrid(this.inpCriteria);
      }
  }


  noLoading() {
    // console.log('NO LOADING');

    this.loading = false;
  }

  searchGrid(value: SearchCriteria) {
    console.log('RICERCA CONTAINER SEARCH GRID');
    this.showGrid = true;

    this.rs.lastSearchCriteria = value;
    this.inpCriteria = value;

    // console.log(this.urlString);
    this.showGrid = true;

    this.rs.GetRicerca(this.inpCriteria)
                .subscribe(data => {
                  // console.log(data);
                  this.loading = false;
                  this.rowDataLoaded = data;
                  if ( this.rowDataLoaded.length > 0 ) {
                      this.myRowData = this.rowDataLoaded;
                      this.showGrid = true;
                      this.emptyData = false;
                    } else {
                      this.showGrid = true;
                      this.emptyData = true;
                    }
                }, error => {
                  this.myRowData = [ 1, 2, 3, 4, 5, 6, 7 ];
                  this.loading = false;
                }
                );
  }

  updateStatiFisici() {
    this.rs.GetStatiFisici()
      .subscribe(data => {
        this.statiFisiciData = data;
        // this.currentStatoFisico = data[0];
        this.uploadCounter++;
        this.checkLoading(this.uploadCounter);
      });
    // console.log('CURRENT STATO FISICO : ');
  }

  updateStatiCiclo() {
    this.rs.GetStatiCiclo()
      .subscribe(data => {
        this.statiCicloData = data;
        // this.currentStatoCiclo = data[0];
        this.uploadCounter++;
        this.checkLoading(this.uploadCounter);
    });
  }

  updatePresse() {
    this.rs.GetPresse()
    .subscribe(data => {
    this.presseData = data;
    this.uploadCounter++;
    this.checkLoading(this.uploadCounter);
  });
  }

  updateLeghe() {
    this.rs.GetLeghe()
    .subscribe(data => {
    this.legheData = data;
    this.uploadCounter++;
    this.checkLoading(this.uploadCounter);
  });
  }

  updateStatoData() {
    this.statoData = this.rs.GetTipoData();
    this.uploadCounter++;
    this.checkLoading(this.uploadCounter);
  }

  updateForme() {
    this.rs.GetForme()
    .subscribe(data => {
    this.formeData = data;
    this.uploadCounter++;
    this.checkLoading(this.uploadCounter);
  });
  }

  checkLoading(value: number) {
    if (value === 6) {
      this.loading = false;
    }
  }

  generateLottiCerts(value: string[]) {
    const toGenerate: AccodaGenerazioneModel[] = [];

    value.forEach(element => {
      const singleGen = new AccodaGenerazioneModel();
      singleGen.Lotto = element;
      singleGen.Commessa = '';
      singleGen.TipoAccodamento = 1;
      singleGen.ProveSelezionate = [];

      toGenerate.push(singleGen);
    });


    console.log('CONTAINER : ' + value);
    this.title = 'Generazione certificati';
    this.content = value.toString();


    if ( toGenerate !== null && toGenerate !== undefined && toGenerate.length > 0 ) {
      this.rs.accodaCertificati(toGenerate).subscribe( res => {
        this.content = 'Richiesti : ' + res.richiesteInviate + ' - OK : ' + res.richiesteOK + ' - KO : ' + res.richiesteKO;
        document.getElementById('openModalButton').click();
      });
    }
  }
}
