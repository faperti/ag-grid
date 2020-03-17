import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRiassegnazioniComponent } from '../../components/search-riassegnazioni/search-riassegnazioni.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '../datepicker/datepicker.module';

@NgModule({
  declarations: [ SearchRiassegnazioniComponent ],
  imports: [
    CommonModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule
  ],
  exports: [ SearchRiassegnazioniComponent ]
})
export class RicercaRiassegnazioniSharedModule { }
