import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthenticationService } from 'src/app/core/modules/login/services/authentication/authentication.service';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { GenerateCertsResult } from 'src/app/model/GenerateCertsResult';

@Injectable()
export class LottoDataService {

  private baseUrlString = 'http://localhost:4518/api/';

  constructor( private http: HttpClient, private DS: DataService ) {
    // this.accessToken = '';
  }

  // tslint:disable-next-line:no-any
  GetClienti(lotto: string): any {
    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + 'CicliLanciatiClienti?lotto=' + lotto;

    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetLottoDetail(lotto: string): any {

      // this.lotto = '1812050025';
      // tslint:disable-next-line:max-line-length
      const urlString = this.baseUrlString + 'Lotto?lotto=' + lotto;

      return this.http.get(urlString);
      // .subscribe(data => {
      //   console.log(data);
      //   this.cLotto = data as Lotto;
  }

// tslint:disable-next-line:no-any
  GetAnalisi(lotto: string): any {

    // tslint:disable-next-line:max-line-length
    const urlString = this.baseUrlString + 'ProveAnalisiReport?lotto=' + lotto + '&normativa=EURAL&bAlter=false';
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetCollaudo(lotto: string, normativa: string): any {
    const urlString = this.baseUrlString +  'ProveCollaudoReport?lotto=' + lotto + '&normativa=' + normativa;
    // console.log(urlString);
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
  GetNumerositaProve(lotto: string): any {
    const urlString = this.baseUrlString +  'NumerositaProve?lotto=' + lotto ;
    // console.log(urlString);
    return this.http.get(urlString);
  }

  // tslint:disable-next-line:no-any
    getCollaudoWithToken(lotto: string, normativa: string): any {

      console.log('getCollaudoWithToken');
      console.log(this.DS.getAccessToken());

      // tslint:disable-next-line:object-literal-shorthand
      const body = { lotto: lotto, normativa: normativa };
      console.log(body);

      // const urlString = this.baseUrlString +  'ProveCollaudoReport?lotto=' + lotto + '&normativa=' + normativa;
      const urlString = this.baseUrlString +  'ProveCollaudoReport';

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



  }
