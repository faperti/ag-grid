import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LottoDataService {

  private baseUrlString = 'http://localhost:4518/api/';

  constructor( private http: HttpClient ) {
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





  }
