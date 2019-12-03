import { AgRendererComponent } from 'ag-grid-angular';
import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  template: '<a [routerLink]=""><i (click)="passTheSalt([myParams.data.id_variaz])">{{myParams.data.commessaDa}}</i></a>',
  })
  export class AnchorEventClickRendererComponent implements AgRendererComponent {
    myParams: any;
    urlString: string;
    variazioneResponse: string;

    constructor(private http: HttpClient) {

    }

    agInit(params: any): void {
      // console.log(params);
      this.myParams = params;
      // console.log('pass the salt');
      // console.log(this.myParams.CommessaDa);
      // console.log(this.myParams.idRiassegnazione);
    }

    refresh(params: any): boolean {
      return false;
    }

    passTheSalt(idVariazione: number) {
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
