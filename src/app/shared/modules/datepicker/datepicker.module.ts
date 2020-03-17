import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomControlComponent } from '../../components/datepicker/datepicker.component';
import { DatePipe, CommonModule } from '@angular/common';

// import { NgbdDatepickerAdapter } from '../../components/datepicker/datepicker.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  // declarations: [ NgbdDatepickerAdapter ],
  // exports: [ NgbdDatepickerAdapter ],
  // bootstrap: [ NgbdDatepickerAdapter ]
  declarations: [ CustomControlComponent ],
  providers: [
    DatePipe
  ],
  exports: [ CustomControlComponent ],
  bootstrap: [ CustomControlComponent ]
})
export class DatePickerModule {}
