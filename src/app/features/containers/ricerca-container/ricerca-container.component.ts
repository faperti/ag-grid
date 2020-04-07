import { Component, OnInit, Input } from '@angular/core';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-ricerca-container',
  templateUrl: './ricerca-container.component.html',
  styleUrls: ['./ricerca-container.component.scss']
})
export class RicercaContainerComponent implements OnInit {

  // @Input() inpCriteria: SearchCriteria;

  urlString = '';
  rowDataLoaded: any;
  myRowData: any;
  inpCriteria: SearchCriteria;
  loading: boolean;
  emptyData: boolean;

  private statoData: any;
  private formeData: any;
  private legheData: any;
  private presseData: any;
  private statiCicloData: any;
  private statiFisiciData: any;
  private showGrid: boolean;
  private uploadCounter = 0;

  constructor(private http: HttpClient, private ds: DataService) {
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
    console.log('NO LOADING');

    this.loading = false;
  }

  searchGrid(value: SearchCriteria) {
    console.log('RICERCA CONTAINER SEARCH GRID');
    this.showGrid = true;

    this.inpCriteria = value;

    // tslint:disable-next-line:max-line-length
    this.urlString = 'http://localhost:4518/api/CicliLanciati?lotto=' + this.inpCriteria.Lotto;
    this.urlString = this.urlString + '&data_da=' + this.inpCriteria.DataStart;
    this.urlString = this.urlString + '&data_a=' + this.inpCriteria.DataEnd;
    this.urlString = this.urlString + '&tipo_data=' + this.inpCriteria.TipoData;
    this.urlString = this.urlString + '&id_lega=' + this.inpCriteria.IdLega;
    this.urlString = this.urlString + '&id_forma=' + this.inpCriteria.IdForma;
    this.urlString = this.urlString + '&id_statociclo=' + this.inpCriteria.IdStatoCiclo;
    this.urlString = this.urlString + '&id_statofisico=' + this.inpCriteria.IdStatoFisico;
    this.urlString = this.urlString + '&id_cliente=' + this.inpCriteria.IdCliente;
    this.urlString = this.urlString + '&pressa=' + this.inpCriteria.Pressa;
    this.urlString = this.urlString + '&bLottiAperti=' + this.inpCriteria.LottiAperti;
    this.urlString = this.urlString + '&bLottiChiusi=' + this.inpCriteria.LottiChiusi;
    this.urlString = this.urlString + '&bRicercaCommessa=' + this.inpCriteria.Commessa;
    this.urlString = this.urlString + '&bRicercaMatricola=' + this.inpCriteria.Matricola;
    this.urlString = this.urlString + '&dimensione=' + this.inpCriteria.Dimensione;
    this.urlString = this.urlString + '&colata=' + this.inpCriteria.Colata;

    // console.log(this.urlString);
    this.showGrid = true;

    this.http.get(this.urlString)
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
    this.http
    .get('http://localhost:4518/api/StatoFisico')
      .subscribe(data => {
        this.statiFisiciData = data;
        // this.currentStatoFisico = data[0];
        this.uploadCounter++;
        this.checkLoading(this.uploadCounter);
      });
    console.log('CURRENT STATO FISICO : ');
  }

  updateStatiCiclo() {
    this.http
    .get('http://localhost:4518/api/StatoCiclo')
      .subscribe(data => {
        this.statiCicloData = data;
        // this.currentStatoCiclo = data[0];
        this.uploadCounter++;
        this.checkLoading(this.uploadCounter);
    });
  }

  updatePresse() {
    this.http
    .get('http://localhost:4518/api/Presse')
  .subscribe(data => {
  this.presseData = data;
  this.uploadCounter++;
  this.checkLoading(this.uploadCounter);
  });
  }

  updateLeghe() {
    this.http
    .get('http://localhost:4518/api/Leghe')
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
    this.http
    .get('http://localhost:4518/api/Forme')
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
