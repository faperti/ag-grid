import { Component, OnInit, Input } from '@angular/core';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { HttpClient } from '@angular/common/http';
import { LottoDataService } from '../lotto-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lottonumerositaprove',
  templateUrl: './lottonumerositaprove.component.html',
  styleUrls: ['./lottonumerositaprove.component.scss']
})
export class LottonumerositaproveComponent extends BaseLottoView implements OnInit {

  @Input() lotto: string;

  anaFatte: '';
  macroFatte: '';
  mecFatte: '';
  mecASTMFatte: '';
  macroTotali: '';
  mecTotali: '';
  mecASTMTotali: '';
  anaTotali: '';
  dimNumerosita: '';
  dimPrescritte: '';


  constructor(http: HttpClient, activatedRoute: ActivatedRoute, ds: LottoDataService) {
    super(http, activatedRoute, ds);

  }

  ngOnInit() {
    super.ngOnInit();

    this.ds.GetNumerositaProve(this.lotto)
    .subscribe ( data => {

        console.log(data);

        this.anaFatte = data.anaFatte;
        this.anaTotali = data.anaTotali;

        this.macroFatte = data.macroFatte,
        this.macroTotali = data.macroTotali;

        this.mecFatte = data.mecFatte;
        this.mecTotali = data.mecTotali;

        // this.mecASTMFatte = data.mecASTMFatte;
        // this.mecASTMTotali = data.mecASTMTotali;

        this.dimNumerosita = data.dimensioneNumerosita;
        this.dimPrescritte = data.dimensionePrescritte;
      });
  }
}
