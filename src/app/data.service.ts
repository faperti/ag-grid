import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  lotto: string;
  dataDa: string;
  dataA: string;
  tipoData: string;
  StatoCiclo: string;
  StatoFisico: string;
  Cliente: string;
  Lega: string;
  LottiAperti: boolean;
  LottiChiusi: boolean;
  RicercaCommessa: boolean;

  constructor() { }

  changeMessage(message: string) {
    alert('DataService : ' + message);
    this.messageSource.next(message);
  }

}
