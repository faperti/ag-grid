import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lottonavbar',
  templateUrl: './lottonavbar.component.html',
  styleUrls: ['./lottonavbar.component.scss']
})
export class LottonavbarComponent implements OnInit {

  @Input() lotto: string;

  constructor() { }

  ngOnInit() {
    // console.log('NAVBAR : ');
    // console.log(this.lotto);
  }

}
