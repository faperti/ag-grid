import {Component, Injectable, Output, OnChanges, SimpleChanges, EventEmitter, forwardRef, Injector} from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NgControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      const date = value.split(this.DELIMITER);
      result = {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return result;
  }

  toModel(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }

}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = null;
    if (value) {
      const date = value.split(this.DELIMITER);
      result = {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return result;
  }

  format(date: NgbDateStruct): string {
    let result: string = null;
    if (date) {
      result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlComponent),
      multi: true
    },
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class CustomControlComponent implements ControlValueAccessor {
  value: string;

  private onChange: (datePickerValue: NgbDateStruct) => void;
  private onTouched: () => void;

  constructor( private datePipe: DatePipe ) {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
  }

  dateChange(dateChangeEvent: NgbDateStruct) {

    console.log('DATE CHANGE EVENT');
    console.log(dateChangeEvent);
    // this.onChange(new Date(dateChangeEvent.year, dateChangeEvent.month - 1, dateChangeEvent.day));
    this.onChange(dateChangeEvent);
  }

  dateStringChange(eDateStrChange: Event) {

    console.log('DATE STRING CHANGE');

    let ngb: NgbDateStruct;
    let dateAttributes: string[];

    console.log((eDateStrChange.srcElement as HTMLInputElement).value);
    const dateValue = (eDateStrChange.srcElement as HTMLInputElement).value;

    if (dateValue.indexOf('/') > 0) {
      dateAttributes = this.parseDateString(dateValue, '/');
    }

    if (dateValue.indexOf('\\') > 0) {
      dateAttributes = this.parseDateString(dateValue, '\\');
    }

    if (dateValue.indexOf('-') > 0) {
      dateAttributes = this.parseDateString(dateValue, '-');
    }

    if (dateValue.indexOf('.') > 0) {
      dateAttributes = this.parseDateString(dateValue, '-');
    }

    if ( dateAttributes !== undefined && dateAttributes.length === 3 ) {
      ngb = {
        year: parseInt(dateAttributes[2], 10),
        month: parseInt(dateAttributes[1], 10),
        day: parseInt(dateAttributes[0], 10)
      };
    }

    console.log(ngb);
    this.onChange(ngb);
  }

  parseDateString(value: string, delimiter: string): string[] {
    return value.split(delimiter);
  }

  writeValue(defaultValue: NgbDateStruct): void {
    this.value = defaultValue.day + '-' + defaultValue.month + '-' + defaultValue.year;
   }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
