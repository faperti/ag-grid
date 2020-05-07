import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LottoDataService } from '../lotto-data.service';
import { Lotto } from 'src/app/model/lotto';
import { BaseLottoView } from '../models/abstracts/base-lotto-view';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ModalModule } from '../../../../shared/modules/modal/modal.module';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-lottonote',
  templateUrl: './lottonote.component.html',
  styleUrls: ['./lottonote.component.scss']
})
export class LottonoteComponent extends BaseLottoView implements OnInit {

  @Input() lotto = '';
  @Output() clickSearch = new EventEmitter<number>();

  private urlString: string;
  note: string;
  noteModalId = 12345;
  noteLaboratorio = 'note Laboratorio per modal';

  constructor( http: HttpClient, activatedRoute: ActivatedRoute, dataservice: LottoDataService, commonservice: CommonService) {
    super(http, activatedRoute, dataservice, commonservice);
  }

  ngOnInit() {
    // console.log('LOTTO NOTE');
    // console.log(this.lotto);

    super.ngOnInit();
    this.ShowNote('GENERALI');

  }

  ShowNote(area: string) {
    console.log('SHOW NOTE');
    this.ds.GetLottoNote(this.lotto, area)
    .subscribe(data => {
      this.note = data;
  });

}


}
