import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lotto } from '../../model/lotto';


@Component({
  selector: 'app-lotto-detail',
  templateUrl: './lotto.detail.component.html',
  styleUrls: ['./lotto.detail.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class LottoDetailComponent implements OnInit {

  @Input() lotto = '';
  @Output() clickSearch = new EventEmitter<number>();

  private urlString: string;
  private cLotto: Lotto;

  constructor(private http: HttpClient) { }

  ngOnInit() {
      this.lotto = '1812050025';
      // tslint:disable-next-line:max-line-length
      this.urlString = 'http://localhost:4518/api/Lotto?lotto=' + this.lotto;

      // alert(this.urlString);

      this.http
      .get(this.urlString)
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
