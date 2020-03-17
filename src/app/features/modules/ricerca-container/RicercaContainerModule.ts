import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicercaContainerComponent } from '../../containers/ricerca-container/ricerca-container.component';
import { Parent1Module } from '../parent1/parent1.module';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [RicercaContainerComponent],
  imports: [
    CommonModule, Parent1Module, SpinnerSharedModule, NgbDatepickerModule
  ]
})
export class RicercaContainerModule {
}
