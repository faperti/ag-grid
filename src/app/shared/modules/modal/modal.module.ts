import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalReadOnlyComponent } from '../../components/modal-read-only/modal-read-only.component';
import { ModalComponent } from '../../components/modal/modal.component';

@NgModule({
  declarations: [ ModalComponent , ModalReadOnlyComponent ],
  imports: [
    CommonModule
  ],
  exports: [ ModalReadOnlyComponent ]
})
export class ModalModule { }
