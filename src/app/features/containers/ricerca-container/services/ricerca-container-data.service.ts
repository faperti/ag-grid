import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { GenerateCertsResult } from 'src/app/model/GenerateCertsResult';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { CommonService } from 'src/app/shared/services/common.service'
import { StampeResultModel } from 'src/app/renderers/model/StampeResultModel';
import { Observable } from 'rxjs';

@Injectable()
export class RicercaContainerDataService {

  private baseUrlString = '';
  lastSearchCriteria: SearchCriteria;

  constructor( private http: HttpClient, private DS: DataService, private cs: CommonService ) {
    // this.accessToken = '';
    this.baseUrlString = this.cs.baseUrl;
  }

GetTipoData(): string[] {
  return ['TRAZIONE', 'ANALISI', 'ESTRUSIONE', 'LANCIO'];
}


  // tslint:disable-next-line:no-any
  GetRicerca(inpCriteria: SearchCriteria): any {

        // tslint:disable-next-line:max-line-length
        let urlString = this.baseUrlString + '/CicliLanciati?lotto=' + inpCriteria.Lotto;
        urlString = urlString + '&data_da=' + inpCriteria.DataStart;
        urlString = urlString + '&data_a=' + inpCriteria.DataEnd;
        urlString = urlString + '&tipo_data=' + inpCriteria.TipoData;
        urlString = urlString + '&id_lega=' + inpCriteria.IdLega;
        urlString = urlString + '&id_forma=' + inpCriteria.IdForma;
        urlString = urlString + '&id_statociclo=' + inpCriteria.IdStatoCiclo;
        urlString = urlString + '&id_statofisico=' + inpCriteria.IdStatoFisico;
        urlString = urlString + '&id_cliente=' + inpCriteria.IdCliente;
        urlString = urlString + '&pressa=' + inpCriteria.Pressa;
        urlString = urlString + '&bLottiAperti=' + inpCriteria.LottiAperti;
        urlString = urlString + '&bLottiChiusi=' + inpCriteria.LottiChiusi;
        urlString = urlString + '&bRicercaCommessa=' + inpCriteria.Commessa;
        urlString = urlString + '&bRicercaMatricola=' + inpCriteria.Matricola;
        urlString = urlString + '&dimensione=' + inpCriteria.Dimensione;
        urlString = urlString + '&colata=' + inpCriteria.Colata;

        return this.http.get(urlString);

  }


  // tslint:disable-next-line:no-any
  GetLeghe(): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/Leghe';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetForme(): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/Forme';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetPresse(): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/Presse';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetStatiCiclo(): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/StatoCiclo';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetStatiFisici(): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/StatoFisico';
    return this.http.get(urlString);
  }



  // tslint:disable-next-line:no-any
  GetLottoDetail(lotto: string): any {

      // this.lotto = '1812050025';
      // tslint:disable-next-line:max-line-length
      const urlString = this.baseUrlString + '/Lotto?lotto=' + lotto;

      return this.http.get(urlString);
      // .subscribe(data => {
      //   console.log(data);
      //   this.cLotto = data as Lotto;
  }

// tslint:disable-next-line:no-any
  GetAnalisi(lotto: string): any {

    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + '/ProveAnalisiReport?lotto=' + lotto + '&normativa=EURAL&bAlter=false';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetCollaudo(lotto: string, normativa: string): any {
    const urlString = this.baseUrlString +  '/ProveCollaudoReport?lotto=' + lotto + '&normativa=' + normativa;
    // console.log(urlString);
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetNumerositaProve(lotto: string): any {
    const urlString = this.baseUrlString +  '/NumerositaProve?lotto=' + lotto ;
    // console.log(urlString);
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
    getCollaudoWithToken(lotto: string, normativa: string): any {

      console.log('getCollaudoWithToken');
      // console.log(this.DS.getAccessToken());

      // tslint:disable-next-line:object-literal-shorthand
      const body = { lotto: lotto, normativa: normativa };
      console.log(body);

      // const urlString = this.baseUrlString +  'ProveCollaudoReport?lotto=' + lotto + '&normativa=' + normativa;
      const urlString = this.baseUrlString +  '/ProveCollaudoReport';

      // tslint:disable-next-line:max-line-length
      return this.http.post(urlString, body , { headers : { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.DS.getAccessToken() } } );

    }

    accodaCertificato(acm: AccodaGenerazioneModel) {

      const updatesToSend: AccodaGenerazioneModel[] = [];

      // this.updatesToSend = [];
      // this.updates = 1;

      updatesToSend.push(acm);

      console.log('lotto data service accodaCertificato : ' + updatesToSend);

      const headers = new HttpHeaders().set('Content-type', 'application/json');
      const body = {
                          body: updatesToSend
                   };

      console.log(body);
      this.http.post<GenerateCertsResult>('http://localhost:4518/api/Stampe', updatesToSend, {headers} )
        .subscribe(res => {
          alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
        });
    }


    // tslint:disable-next-line:no-any
    accodaCertificati(value: AccodaGenerazioneModel[]): Observable<StampeResultModel> {

      console.log('ricerca container data service accodaCertificati : ' + value);

      const headers = new HttpHeaders().set('Content-type', 'application/json');
      const body = {
                          body: value
                   };

      return this.http.post<StampeResultModel>('http://localhost:4518/api/Stampe', value, {headers} );
        // .subscribe(res => {
        //   alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
        // });

    }



  }
