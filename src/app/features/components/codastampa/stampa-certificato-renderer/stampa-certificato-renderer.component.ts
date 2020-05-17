import { AgRendererComponent } from 'ag-grid-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  // tslint:disable-next-line:max-line-length
   template: '<div align="center" *ngIf="stampa"><input type="checkbox" (change)="onChange($event)" [checked]=""/></div>' +
             '<div align="center" *ngIf="!stampa"><label>{{dateString}}</label></div>'
})
// tslint:disable-next-line:max-line-length
export class StampaCertificatoRendererComponent implements AgRendererComponent {

  public params: ICellRendererParams;
  public dateString: string;
  public stampa: boolean;

  agInit(params: ICellRendererParams): void {
    this.params = params;

    this.dateString = this.params.data.generato;
    this.stampa = this.params.data.stampa;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  public onChange(event: any) {
    console.log(event);
    // alert('onChange CheckBox');
    this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    // alert(this.params.colDef.field);
    // alert(event.currentTarget.checked);
    // console.log(this.params.data);
  }
}
