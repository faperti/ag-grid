import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AccodaGenerazioneModel } from '../model/accoda-generazione-model';
import { GenerazioneCertificatoCliente } from '../../model/enums/GenerazioneCertificatoCliente';

@Component({
  template: '<div>' +
  '<i class="fa fa-plus fa-2x" aria-hidden="true" title="Accoda a certificato esistente" (click)="accodaCertificato()"></i>&nbsp;' +
  '<i class="fa fa-print fa-2x" aria-hidden="true" title="Accoda" (click)="accodaGenerazioneStandard()"></i>&nbsp;' +
  // tslint:disable-next-line:max-line-length
  '<a href="http://archiviocertificati.eural.com/{{myParams.data.pathCertificatoCommessa}}" target="_blank"><i class="fa fa-file-pdf-o fa-2x" aria-hidden="true" title="Visualizza certificato"></i></a>'
  // '<img border="0" (click)="accodaGenerazioneStandard()" title="Standard" width="32" height="32" src="/assets/images/accoda.gif"/>'
  // tslint:disable-next-line:max-line-length
  // '<img border="0" (click)="accodaCertificato()" title="Accoda a certificato esistente" width="32" height="32" src="/assets/images/accoda.gif"/>'
  // // tslint:disable-next-line:max-line-length
  // '<img border="0" (click)="accodaCertificatoConProve()" title="Certificato con prove" width="32" height="32" src="/assets/images/accoda.gif"/></div>'
})

  export class AccodaGenerazioneCertificatoRendererComponent implements ICellRendererAngularComp  {

    // tslint:disable-next-line:no-any
    myParams: any;
    urlString: string;
    variazioneResponse: string;
    acm: AccodaGenerazioneModel;

    constructor(private http: HttpClient) {
    }

    // tslint:disable-next-line:no-any
    agInit(params: any): void {
      // console.log('AG INIT');
      this.myParams = params;
      console.log('MY PARAMS : ');
      console.log(this.myParams);
    }

    // tslint:disable-next-line:no-any
    refresh(params: any): boolean {
      return false;
    }

    public invokeParentMethod(tipoGenerazione: GenerazioneCertificatoCliente) {

      this.acm = new AccodaGenerazioneModel();
      this.acm.Lotto = this.myParams.data.lotto;
      this.acm.Commessa = this.myParams.data.commessa;
      // il tipo di accodamento indica l'eventuale operazione che deve essere compiuta dal generatore dei certificati
      this.acm.TipoAccodamento = tipoGenerazione;

      // console.log(this.acm);

      alert('invoke parent method : invokeParentMethod()');
      // tslint:disable-next-line:max-line-length
      this.myParams.context.componentParent.methodFromParent(this.acm);
  }

    accodaGenerazioneStandard() {
      // console.log(this.myParams);
      this.invokeParentMethod(GenerazioneCertificatoCliente.GenerazioneStandard);
    }

    accodaCertificato() {
      // console.log(this.myParams);
      this.invokeParentMethod(GenerazioneCertificatoCliente.AccodaCertificato);
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
