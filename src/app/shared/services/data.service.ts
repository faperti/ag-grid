import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { RigaMenuModel, Menu } from '../../model/navbar/RigaMenuModel';
import { GenerateCertsResult } from '../../model/GenerateCertsResult';
import { ProfiloUtenteModel } from 'src/app/model/navbar/ProfiloUtenteModel';

@Injectable()
export class DataService {

  private accessToken = '';
  public lotto = '';
  public dataDa = '';
  public dataA = '';
  public StatoFisico = '';
  public StatoCiclo = '';
  public Ciclo = '';
  public Cliente = '';

  public currentLogin = '';

  public ElencoMenu: Menu[];
  public ProfiloUtente: ProfiloUtenteModel;

  // // Observable string sources
  // private key = new Subject<string>();
  // private menu = new ReplaySubject<Menu[]>();

  //// Observable string streams
  // Key = this.key.asObservable();
  // Menu = this.menu.asObservable();

  constructor() {
    // this.accessToken = '';
  }

  setAccessToken(value: string) {
    this.accessToken = value;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  }
