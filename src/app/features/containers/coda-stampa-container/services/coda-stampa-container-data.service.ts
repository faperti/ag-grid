import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
import { AccodaGenerazioneModel } from 'src/app/renderers/model/accoda-generazione-model';
import { GenerateCertsResult } from 'src/app/model/GenerateCertsResult';
import { SearchCriteria } from 'src/app/model/searchCriteria';
import { CommonService } from 'src/app/shared/services/common.service';
import { StampeResultModel } from 'src/app/renderers/model/StampeResultModel';
import { Observable } from 'rxjs';


@Injectable()
export class CodaStampaContainerDataService {

  private baseUrlString = '';
  lastSearchCriteria: SearchCriteria;

  constructor( private http: HttpClient, private DS: DataService, private cs: CommonService ) {
    // this.accessToken = '';
    this.baseUrlString = this.cs.baseUrl;
  }

  // tslint:disable-next-line:no-any
  GetCodaGenerazione(dataStart: string, dataEnd: string, tipo: number): any {
    const urlString = this.baseUrlString +  '/CodaGenerazione?data_da=' + dataStart + '&data_a=' + dataEnd + '&tipo=' + tipo;
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

    // tslint:disable-next-line:no-any
    importGenerazioni(value: number[]): any {
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      const body = { certificatiGenerati : value };

      console.log(body);
      return this.http.post(this.baseUrlString + '/CodaGenerazione', value, {headers} );
      //  .subscribe(res => {
      //    console.log('RES');
      //    console.log(res);
          // alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
      //   });
    }
  }
