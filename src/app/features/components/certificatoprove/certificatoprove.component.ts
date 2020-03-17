import { Component, OnInit } from '@angular/core';
import { SearchCriteriaCertificatoProve } from '../../../model/SearchCriteriaCertificatoProve';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerateCertsResult } from '../../../model/GenerateCertsResult';
import { AccodaGenerazioneModel } from '../../../renderers/model/accoda-generazione-model';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificatoprove',
  templateUrl: './certificatoprove.component.html',
  styleUrls: ['./certificatoprove.component.scss']
})
export class CertificatoProveComponent implements OnInit {

  private myValue: number;
  private lottoToChild: string;
  private urlString: string;
  private criteriaToGrid: SearchCriteriaCertificatoProve;
  private updates: number;
  private updatesToSend: AccodaGenerazioneModel[];

  constructor(private router: Router, private ds: DataService, private http: HttpClient ) { }

  ngOnInit() {
    this.myValue = 0;
    this.lottoToChild = '';
  }

  updateMyValue() {
    this.lottoToChild = '1234567890';
  }

  updateMyGrid(value: SearchCriteriaCertificatoProve) {
    console.log('updateMyGrid');
    this.criteriaToGrid = value;
  }

  accodaCertificato(acm: AccodaGenerazioneModel) {

    this.updatesToSend = [];
    this.updates = 1;

    this.updatesToSend.push(acm);

    console.log('accodaCertificato : ' + this.updatesToSend);

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
