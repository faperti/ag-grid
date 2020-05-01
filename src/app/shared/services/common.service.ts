import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { RigaMenuModel, Menu } from '../../model/navbar/RigaMenuModel';
import { GenerateCertsResult } from '../../model/GenerateCertsResult';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

function padNumber(value: number) {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return '';
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

@Injectable()
export class CommonService {

// baseUrl = 'http://certificatiwebapi.eural.com/api';
// baseUrlToken = 'http://certificatiwebapi.eural.com/token';

baseUrl = 'http://localhost:4518/api';
baseUrlToken = 'http://localhost:4518/token';

constructor() {
    // this.accessToken = '';
  }

format(date: NgbDateStruct): string {
    // console.log(date.getMonth() );
    // return this.datePipe.transform(date, 'yyyy/MM/dd');

    // console.log('common service');
    // console.log('date');
    // console.log(date);

    let stringDate = '';
    if (date) {
        stringDate += date.year;
        stringDate += isNumber(date.month) ? padNumber(date.month) : '';
        stringDate += isNumber(date.day) ? padNumber(date.day) : '';
    }

    // console.log('String date');
    // console.log(stringDate);

    return stringDate;
  }

  }
