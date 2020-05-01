import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AccodaGenerazioneModel } from '../../../../../renderers/model/accoda-generazione-model';
import { GenerazioneCertificatoCliente } from '../../../../../model/enums/GenerazioneCertificatoCliente';

// import { ModalModule } from '../../../../../shared/modules/modal/modal.module';


@Component({
  // template: '<div>' +
  // '<i class="fa fa-plus fa-2x" aria-hidden="true" title="Accoda a certificato esistente"></i>&nbsp;' +
  // '<i class="fa fa-print fa-2x" aria-hidden="true" title="Accoda" ></i>&nbsp;' +
  // '<i class="fa fa-file-pdf-o fa-2x" aria-hidden="true" title="Visualizza certificato"></i>&nbsp;'

  template: '<div *ngIf="myParams.data.note.length">' +
     '<img (click)="clickMe(\'NotExpr.GIF\')" src="/assets/images/matita.gif" data-toggle="modal" data-target="#myModal" />' +
      '</div>'
  //    '<app-modal-read-only [modalId]="noteModalId" modalTitle="Note" [modalText]="note + noteLaboratorio">' +
  //    '</app-modal-read-only>'

})

  export class NoteClienteRendererComponent implements ICellRendererAngularComp  {

    get note(): string { return this.myParams.data.note; }
    get noteLaboratorio(): string { return this.myParams.data.notelaboratorio; }
    get noteModalId(): string { return this.myParams.data.id_lanciaticlienti; }

    // tslint:disable-next-line:no-any
    myParams: any;
    urlString: string;
    variazioneResponse: string;
    acm: AccodaGenerazioneModel;

    constructor(private http: HttpClient) {

    }

    // tslint:disable-next-line:no-any
    agInit(params: any): void {
      this.myParams = params;
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

  clickMe(msg: string) {
    // alert(msg);
    // this.myParams.context.componentParent.mostraNote(this.myParams);
  }


  }
