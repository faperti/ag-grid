import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../components/spinner/spinner.component';



@NgModule({
  declarations: [ SpinnerComponent ],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [ SpinnerComponent ]
})
export class SpinnerSharedModule { }
