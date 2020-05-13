import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportaRiassegnazioniComponent } from '../../components/importa-riassegnazioni/importa-riassegnazioni.component';
import { GridNuoveAssegnazioniComponent } from 'src/app/grid-nuove-assegnazioni-component/grid-nuove-assegnazioni.component';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RicercaRiassegnazioniSharedModule } from 'src/app/shared/modules/ricerca/ricerca-riassegnazioni-shared.module';
import { DatePickerModule } from 'src/app/shared/modules/datepicker/datepicker.module';
import { SearchRiassegnazioniComponent } from 'src/app/shared/components/search-riassegnazioni/search-riassegnazioni.component';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { RicercaContainerDataService } from '../../containers/ricerca-container/services/ricerca-container-data.service';
import { ImportaRiassegnazioniContainerComponent } from '../../containers/importa-riassegnazioni-container/importa-riassegnazioni-container.component';
import { ImportaRiassegnazioniContainerDataService } from '../../containers/importa-riassegnazioni-container/services/importa-riassegnazioni-data.service';

@NgModule({
  declarations: [ ImportaRiassegnazioniContainerComponent, ImportaRiassegnazioniComponent, GridNuoveAssegnazioniComponent ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents([]),
    RicercaRiassegnazioniSharedModule,
    DatePickerModule,
    ReactiveFormsModule,
    SpinnerSharedModule
  ],
  exports: [ ImportaRiassegnazioniContainerComponent, ImportaRiassegnazioniComponent ],
  providers: [ ImportaRiassegnazioniContainerDataService ]
})
export class ImportaRiassegnazioniModule { }
