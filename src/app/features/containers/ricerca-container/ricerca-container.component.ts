import { Component, OnInit, Input } from '@angular/core';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { RicercaContainerDataService } from './services/ricerca-container-data.service';

@Component({
  selector: 'app-ricerca-container',
  templateUrl: './ricerca-container.component.html',
  styleUrls: ['./ricerca-container.component.scss']
})
export class RicercaContainerComponent implements OnInit {

  // @Input() inpCriteria: SearchCriteria;

  urlString = '';
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

  constructor(private http: HttpClient, private ds: DataService, private rs: RicercaContainerDataService) {
    this.urlString = '';
  }

  ngOnInit() {
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

  noLoading() {
    // console.log('NO LOADING');

    this.loading = false;
  }

  searchGrid(value: SearchCriteria) {
    console.log('RICERCA CONTAINER SEARCH GRID');
    this.showGrid = true;

    this.inpCriteria = value;

    // // tslint:disable-next-line:max-line-length
    // this.urlString = 'http://localhost:4518/api/CicliLanciati?lotto=' + this.inpCriteria.Lotto;
    // this.urlString = this.urlString + '&data_da=' + this.inpCriteria.DataStart;
    // this.urlString = this.urlString + '&data_a=' + this.inpCriteria.DataEnd;
    // this.urlString = this.urlString + '&tipo_data=' + this.inpCriteria.TipoData;
    // this.urlString = this.urlString + '&id_lega=' + this.inpCriteria.IdLega;
    // this.urlString = this.urlString + '&id_forma=' + this.inpCriteria.IdForma;
    // this.urlString = this.urlString + '&id_statociclo=' + this.inpCriteria.IdStatoCiclo;
    // this.urlString = this.urlString + '&id_statofisico=' + this.inpCriteria.IdStatoFisico;
    // this.urlString = this.urlString + '&id_cliente=' + this.inpCriteria.IdCliente;
    // this.urlString = this.urlString + '&pressa=' + this.inpCriteria.Pressa;
    // this.urlString = this.urlString + '&bLottiAperti=' + this.inpCriteria.LottiAperti;
    // this.urlString = this.urlString + '&bLottiChiusi=' + this.inpCriteria.LottiChiusi;
    // this.urlString = this.urlString + '&bRicercaCommessa=' + this.inpCriteria.Commessa;
    // this.urlString = this.urlString + '&bRicercaMatricola=' + this.inpCriteria.Matricola;
    // this.urlString = this.urlString + '&dimensione=' + this.inpCriteria.Dimensione;
    // this.urlString = this.urlString + '&colata=' + this.inpCriteria.Colata;

    // console.log(this.urlString);
    this.showGrid = true;

    this.rs.GetRicerca(this.inpCriteria)
                .subscribe(data => {
                  // console.log(data);
                  this.loading = false;
                  this.rowDataLoaded = data;
                  if ( this.rowDataLoaded.length > 0 ) {
                      this.myRowData = this.rowDataLoaded;
                      this.emptyData = false;
                    } else {
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
    this.statoData = ['TRAZIONE', 'ANALISI', 'ESTRUSIONE', 'LANCIO'];
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

}
