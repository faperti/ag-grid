import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lotto',
  templateUrl: './lotto.component.html',
  styleUrls: ['./lotto.component.scss']
})
export class LottoComponent implements OnInit {

  @Input() lotto: string;

  myLotto: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.myLotto = this.route.snapshot.paramMap.get('lotto');
    console.log('LOTTOCOMPONENT NGONINIT' );
    // console.log('LOTTOCOMPONENT ' + this.myLotto );

  }
}
