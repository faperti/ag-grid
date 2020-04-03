import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LottoDataService } from '../../lotto-data.service';
import { HttpClient } from '@angular/common/http';

export abstract class BaseLottoView implements OnInit {
    lotto: string;
    ds: LottoDataService;


    protected constructor(private http: HttpClient,
                          private activatedRoute: ActivatedRoute,
                          private dataservice: LottoDataService) { }

    // constructor(private http: HttpClient,
    //     activatedRoute: ActivatedRoute,
    //     private router: Router,
    //     private dataservice: LottoDataService ) {

    ngOnInit() {
        this.lotto = this.activatedRoute.snapshot.queryParamMap.get('lotto');
        this.ds = this.dataservice;
    }
}
