import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchCriteriaRiassegnazioni } from '../model/SearchCriteriaRiassegnazioni';

@Component({
  selector: 'app-parent2',
  templateUrl: './parent2.component.html',
  styleUrls: ['./parent2.component.scss']
})
export class Parent2Component implements OnInit {

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
    alert('updateMyGrid parent2');
    this.criteriaToGrid = value;
  }
}
