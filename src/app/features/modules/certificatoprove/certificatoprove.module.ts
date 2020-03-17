import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { CertificatoProveComponent } from '../../components/certificatoprove/certificatoprove.component';
// tslint:disable-next-line:max-line-length
import { SearchCertificatoProveComponent } from 'src/app/shared/components/search-component-certificato-prove/search-component-certificato-prove.component';
import { GridCertificatoProveComponent } from 'src/app/grid-component-certificato-prove/grid-component-certificato-prove.component';


@NgModule({
  declarations: [ CertificatoProveComponent, SearchCertificatoProveComponent, GridCertificatoProveComponent ],
  imports: [
    CommonModule, FormsModule, AgGridModule.withComponents([])
  ],
  exports: [ CertificatoProveComponent ]
})
export class CertificatoProveModule { }
