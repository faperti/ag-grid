import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AccodaGenerazioneModel } from '../model/accoda-generazione-model';

@Component({
  template: '<div>' +
  '<img border="0" (click)="accoda()" width="32" height="32" src="/assets/images/accoda.gif"/>' +
  '<img border="0" width="32" height="32" src="/assets/images/accoda.gif"/></div>'
})

  export class AccodaGenerazioneCertificatoRendererComponent implements ICellRendererAngularComp  {

    myParams: any;
    urlString: string;
    variazioneResponse: string;
    acm: AccodaGenerazioneModel;

    constructor(private http: HttpClient) {

    }

    agInit(params: any): void {
      this.myParams = params;
      console.log(params);
    }

    refresh(params: any): boolean {
      return false;
    }

    public invokeParentMethod() {



      this.acm = new AccodaGenerazioneModel();
      this.acm.Lotto = this.myParams.data.lotto;
      this.acm.Commessa = this.myParams.data.commessa;
      this.acm.TipoAccodamento = 1;

      console.log(this.acm);

      alert('invoke parent method : invokeParentMethod()');
      // tslint:disable-next-line:max-line-length
      this.myParams.context.componentParent.methodFromParent(this.acm);
  }


    accoda($event) {
      console.log(this.myParams);
      this.invokeParentMethod();

      // if (this.myParams.onClick instanceof Function) {
      //   // put anything into params u want pass into parents component
      //   const params = {
      //     event: $event,
      //     rowData: this.myParams.node.data
      //     // ...something
      //   };
      //   this.myParams.onClick(params);

      // }
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
