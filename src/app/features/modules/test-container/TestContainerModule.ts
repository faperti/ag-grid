import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TestContainerComponent } from '../../containers/test-container/test-container.component';

@NgModule({
  declarations: [TestContainerComponent],
  imports: [
    CommonModule, SpinnerSharedModule, NgbDatepickerModule
  ],
  exports: [TestContainerComponent]
})
export class TestContainerModule {
}
