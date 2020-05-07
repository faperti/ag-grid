import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Lotto } from '/model/lotto';
import { Lotto } from '../../../../model/lotto';
import { LottoDataService } from '../lotto-data.service';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-lotto-detail',
  templateUrl: './lotto.detail.component.html',
  styleUrls: ['./lotto.detail.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class LottoDetailComponent extends BaseLottoView implements OnInit {

  @Input() lotto = '';
  @Output() clickSearch = new EventEmitter<number>();

  private urlString: string;
  cLotto: Lotto;

  constructor(http: HttpClient,
              activatedRoute: ActivatedRoute,
              router: Router,
              dataservice: LottoDataService,
              commonservice: CommonService) {

    super( http, activatedRoute, dataservice, commonservice);

  }

  ngOnInit() {

    super.ngOnInit();

    this.ds.GetLottoDetail(this.lotto)
      .subscribe(data => {
        console.log(data);
        this.cLotto = data as Lotto;
    });

  }

  clickMe(value: number) {
    alert('clickMe alert');

    this.clickSearch.emit(value);
  }
}
