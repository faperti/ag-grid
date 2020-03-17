import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { RigaMenuModel, Menu } from '../../model/RigaMenuModel';
import { GenerateCertsResult } from '../../model/GenerateCertsResult';

@Injectable()
export class DataService {

  public accessToken = '';
  public lotto = '';
  public dataDa = '';
  public dataA = '';
  public StatoFisico = '';
  public StatoCiclo = '';
  public Ciclo = '';
  public Cliente = '';

  public currentLogin = '';

  public VociMenu: Menu[];

  // Observable string sources
  private key = new Subject<string>();
  private menu = new ReplaySubject<Menu[]>();

  // Observable string streams
  Key = this.key.asObservable();
  Menu = this.menu.asObservable();

  constructor() {
    // this.accessToken = '';
  }

  setKeyValue(value: string) {
    this.key.next(this.currentLogin + ' ' + value);
    this.currentLogin = value;
    console.log('CURRENT LOGIN ' + this.currentLogin);
  }

  getKeyValue(): Observable<string> {
    return this.Key;
  }

  setMenu(value: Menu[]) {
    this.VociMenu = JSON.parse(value.toString());
    // alert('SET MENU : ' + this.VociMenu.length);
    // console.log('VOCI MENU : ' + this.VociMenu);

    this.menu.next(value);
  }

  clearMenu() {
    this.VociMenu = null;
    this.menu.next(null);
  }

  getMenuValue(): Observable<Menu[]> {
    return this.Menu;
  }


  getAccessToken() {
    // return this.Menu;
  }

  Check(menu: string): boolean {

    console.log('CHECK');
    alert('CHECK : ' + menu );
    console.log('VOCI MENU : ' + this.VociMenu);
    let result = false;

    if ( this.VociMenu !== null && this.VociMenu !== undefined ) {

      // this.VociMenu = JSON.parse(this.VociMenu.toString());
      console.log('FOREACH : ' + this.VociMenu[0]);

      this.VociMenu.forEach( x => {
        alert(x.VociMenu[0].MenuValue);
        if (x.VociMenu.filter(voce => voce.MenuValue.toUpperCase() === menu.toUpperCase()).length === 1) {
          result = true;
        }
      });
      }

    console.log('RESULT : ' + result);

    return result;
    }
  }
