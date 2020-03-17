import { AgRendererComponent } from 'ag-grid-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ElaboratoAssegnazione } from './model/elaboratoassegnazione';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  // tslint:disable-next-line:max-line-length
  template: '<div align="center" *ngIf="!params.value"><input type="checkbox" (change)="onChange($event)" [checked]="params.value"/></div>' +
            '<div align="center" *ngIf="params.value"><label>{{dateString | date:\'dd/MM/yyyy\'}}</label></div>'
})
// tslint:disable-next-line:max-line-length
export class ElaboratoAssegnazioneRendererComponent implements AgRendererComponent {

  public params: ICellRendererParams;
  public dateString: string;

  agInit(params: ICellRendererParams): void {
    this.params = params;

    this.dateString = this.params.data.data_elaborazione;
  }

  refresh(params: ICellRendererParams): boolean {
    this.dateString = 'BBB';
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
