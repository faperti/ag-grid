import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';

@Component({
  selector: 'app-parent3',
  templateUrl: './parent3.component.html',
  styleUrls: ['./parent3.component.scss']
})
export class Parent3Component implements OnInit {

  private lt: string;
  private myLotto: string;
  private criteriaToGrid: SearchCriteriaRiassegnazioni;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.criteriaToGrid = new SearchCriteriaRiassegnazioni();
    this.criteriaToGrid.DataStart = '';
    this.criteriaToGrid.DataEnd = '';
    this.criteriaToGrid.Commessa = '';
    this.criteriaToGrid.Elaborato = '';

    // this.lt = this.route.snapshot.paramMap.get('lotto');
    // this.myLotto = this.lt;
  }

  updateMyGrid(value: SearchCriteriaRiassegnazioni) {
    alert('updateMyGrid parent3');
    this.criteriaToGrid = value;
  }
}
