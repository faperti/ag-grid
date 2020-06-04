import { AgRendererComponent } from 'ag-grid-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  // tslint:disable-next-line:max-line-length
   template: '<div align="center" *ngIf="!stampa"><input type="checkbox" (change)="onChange($event)" [checked]=""/></div>' +
             '<div align="center" *ngIf="stampa"><label>{{dateString}}</label></div>'
})
// tslint:disable-next-line:max-line-length
export class StampaCertificatoRendererComponent implements AgRendererComponent {

  public params: ICellRendererParams;
  public dateString: string;
  public stampa: boolean;

  agInit(params: ICellRendererParams): void {

    this.params = params;

    console.log('PARAMS : ' + this.params.data.stampa);
    console.log(this.params);

    this.dateString = this.params.data.stampato;
    this.stampa = this.params.data.stampa;
  }

  refresh(params: ICellRendererParams): boolean {
    console.log('REFRESH COMPONENT');
    this.params = params;
    this.stampa = this.params.data.stampa;
    return true;
  }

  public onChange(event: any) {
    console.log(this.params.colDef.field);
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    // this.stampa = event.currentTarget.checked;
  }
}
