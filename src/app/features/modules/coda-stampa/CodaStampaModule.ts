import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CodaStampaContainerComponent } from '../../containers/coda-stampa-container/coda-stampa-container.component';
import { CodastampaComponent } from '../../components/codastampa/codastampa.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DatePickerModule } from 'src/app/shared/modules/datepicker/datepicker.module';
import { SearchCodaStampaComponent } from 'src/app/shared/components/search-coda-stampa/search-coda-stampa.component';
import { CodaStampaContainerDataService } from '../../containers/coda-stampa-container/services/coda-stampa-container-data.service';


@NgModule({
  declarations: [CodaStampaContainerComponent, CodastampaComponent, SearchCodaStampaComponent],
  imports: [
    CommonModule, FormsModule, SpinnerSharedModule, AgGridModule.withComponents([]), DatePickerModule, ReactiveFormsModule
  ],
  exports: [CodaStampaContainerComponent],
  providers: [
    DatePipe, CodaStampaContainerDataService
  ]
})
export class CodaStampaContainerModule {
}
