import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Parent1Component } from '../../components/ricerca/ricerca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponentComponent } from '../../../shared/components/search-shared/search-shared.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { GridComponentComponent } from 'src/app/grid-component-ricerca/grid-component.component';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { DatePickerModule } from 'src/app/shared/modules/datepicker/datepicker.module';
import { RicercaContainerDataService } from '../../containers/ricerca-container/services/ricerca-container-data.service';

@NgModule({
  declarations: [ Parent1Component, GridComponentComponent, SearchComponentComponent ],
  imports: [
    CommonModule, FormsModule, SpinnerSharedModule, AgGridModule.withComponents([]), DatePickerModule, ReactiveFormsModule
  ],
  exports: [ Parent1Component ],
  providers: [
    DatePipe, RicercaContainerDataService
  ]
})
export class Parent1Module { }
