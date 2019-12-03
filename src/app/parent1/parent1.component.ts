import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from '../model/searchCriteria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerateCertsResult } from '../model/GenerateCertsResult';

@Component({
  selector: 'app-parent1',
  templateUrl: './parent1.component.html',
  styleUrls: ['./parent1.component.scss']
})
export class Parent1Component implements OnInit {

  private myValue: number;
  private lottoToChild: string;
  private urlString: string;
  private criteriaToGrid: SearchCriteria;
  private updates: number;
  private updatesToSend: any[];

  constructor(private http: HttpClient ) { }

  ngOnInit() {
    this.myValue = 0;
    this.lottoToChild = '';
  }

  updateMyValue() {
    this.lottoToChild = '1234567890';
  }

  updateMyGrid(value: SearchCriteria) {

    // console.log(' updateMyGrid');
    // console.log(' FORMA ' + value.IdForma);
    // console.log(' PRESSA ' + value.Pressa);
    // console.log(' SF ' + value.IdStatoFisico);
    // console.log(' SC ' + value.IdStatoCiclo);
    // console.log(' idcliente ' + value.IdCliente);
    // console.log(' LOTTO  : ' + value.Lotto);
    // console.log(' DATASTART : ' + value.DataStart);
    // console.log(' DATAEND : ' + value.DataEnd);

    this.criteriaToGrid = value;
  }

  generateCerts(value: string[]) {

    this.updatesToSend = [];
    this.updates = value.length;

    value.forEach(element => {

      const current = { lotto: element, commessa: ''};
      this.updatesToSend.push(current);

    });

    console.log('PARENT 1 : ' + this.updatesToSend);

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = {
                        body: this.updatesToSend
                 };

    console.log(body);

    this.http.post<GenerateCertsResult>('http://localhost:4518/api/Stampe', this.updatesToSend, {headers} )
      .subscribe(res => {
        alert('Richieste inviate ' + res.richiesteInviate + ' OK : ' + res.richiesteOK + ' KO : ' + res.richiesteKO);
      });
  }
}
