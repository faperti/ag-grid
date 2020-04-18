import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { AccodaGenerazioneProvaModel } from '../../../../renderers/model/accoda-generazione-prova-model';
// tslint:disable-next-line:max-line-length
// import { AccodaGenerazioneCertificatoRendererComponent } from '../renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';

@Component({
  selector: 'app-header-grid-component',
  // tslint:disable-next-line:max-line-length
  template: '{{params.displayName}}<div *ngIf="params.showCheck"><input type="checkbox" [(ngModel)]="isChecked" (change)="invokeParentMethod($event)" /></div>'
})

export class HeaderGridComponent {

  @Output() emitProva = new EventEmitter<string>();

  // tslint:disable-next-line:no-any
  private params: any;

  private valore: AccodaGenerazioneProvaModel;
  private isChecked: boolean;
  private noSort: string;

    agInit(params): void {
      console.log(params);
      this.params = params;

      // params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
      // this.onSortChanged();
  }

  public invokeParentMethod() {
    // tslint:disable-next-line:max-line-length
    this.valore = new AccodaGenerazioneProvaModel();
    this.valore.NumeroProva = this.params.numeroProva;
    this.valore.Stato = this.isChecked;

    console.log('HeaderGridComponent');
    console.log(this.valore);

    this.params.context.componentParent.methodFromParent(this.valore);
}

  // onSortChanged() {
  //     this.ascSort = this.descSort = this.noSort = 'inactive';
  //     if (this.params.column.isSortAscending()) {
  //         this.ascSort = 'active';
  //     } else if (this.params.column.isSortDescending()) {
  //         this.descSort = 'active';
  //     } else {
  //         this.noSort = 'active';
  //     }
  // }

}
