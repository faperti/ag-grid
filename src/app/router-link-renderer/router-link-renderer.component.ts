import { AgRendererComponent } from 'ag-grid-angular';
import { Component } from '@angular/core';

@Component({
  template: '<a [routerLink]="[myParams.inRouterLink,myParams.value]"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>',
  // template: '<a [routerLink]="[myParams.inRouterLink]">{{myParams.value}}</a>'
})
  export class RouterLinkRendererComponent implements AgRendererComponent {
    myParams: any;

    agInit(params: any): void {
      // console.log(params.value);
      this.myParams = params;
    }

    refresh(params: any): boolean {
      return false;
    }
  }
