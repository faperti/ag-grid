import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Parent2Component } from '../../components/parent2/parent2.component';
import { GridRiassegnazioniComponent } from 'src/app/grid-riassegnazioni-component/grid-riassegnazioni.component';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { FormsModule } from '@angular/forms';
import { SearchRiassegnazioniComponent } from 'src/app/shared/components/search-riassegnazioni/search-riassegnazioni.component';
import { RicercaRiassegnazioniSharedModule } from 'src/app/shared/modules/ricerca/ricerca-riassegnazioni-shared.module';

@NgModule({
  declarations: [ Parent2Component, GridRiassegnazioniComponent ],
  imports: [
    CommonModule, FormsModule, AgGridModule.withComponents([]), RicercaRiassegnazioniSharedModule
  ],
  exports: [ Parent2Component ]
})
export class Parent2Module { }
