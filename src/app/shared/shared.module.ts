import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from './modules/datepicker/datepicker.module';
import { RicercaRiassegnazioniSharedModule } from './modules/ricerca/ricerca-riassegnazioni-shared.module';
import { SpinnerSharedModule } from './modules/spinner/spinner-shared.module';
import { ModalModule } from './modules/modal/modal.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatePickerModule,
    ModalModule,
    RicercaRiassegnazioniSharedModule,
    SpinnerSharedModule
  ]
})
export class SharedModule { }
