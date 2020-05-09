import { AgRendererComponent } from 'ag-grid-angular';
import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  template: '<a [routerLink]=""><i (click)="passTheSalt([myParams.data.id_variaz])">{{myParams.data.commessaDa}}</i></a>',
  })
  export class AnchorEventClickRendererComponent implements AgRendererComponent {
    // tslint:disable-next-line:no-any
    myParams: any;
    urlString: string;
    variazioneResponse: string;

    constructor(private http: HttpClient) {

    }

    // tslint:disable-next-line:no-any
    agInit(params: any): void {
      // console.log(params);
      console.log('ANCHOR RENDERER');
      this.myParams = params;
      console.log(this.myParams);
      // console.log('pass the salt');
      // console.log(this.myParams.CommessaDa);
      // console.log(this.myParams.idRiassegnazione);
    }

    // tslint:disable-next-line:no-any
    refresh(params: any): boolean {
      return false;
    }

    // tslint:disable-next-line:no-any
    passTheSalt(idVariazione: any) {
      // tslint:disable-next-line:max-line-length
      this.urlString = 'http://localhost:4518/api/RiAssegnazioniSMEA?idVar=' + idVariazione;
      alert(this.urlString);

      this.http
          .get(this.urlString)
          .subscribe(data => {
            // this.variazioneResponse = data;
            console.log('VARIAZIONE : ' + data);
            alert(data);
          });
    }
  }
