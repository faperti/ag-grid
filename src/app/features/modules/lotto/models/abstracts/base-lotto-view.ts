import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common.service';
import { LottoDataService } from '../../dataservicelotto/lotto-data.service';

export abstract class BaseLottoView implements OnInit {
    lotto: string;
    ds: LottoDataService;
    cs: CommonService;


    protected constructor(private http: HttpClient,
                          private activatedRoute: ActivatedRoute,
                          private dataservice: LottoDataService,
                          private commonservice: CommonService) { }

    // constructor(private http: HttpClient,
    //     activatedRoute: ActivatedRoute,
    //     private router: Router,
    //     private dataservice: LottoDataService ) {

    ngOnInit() {
        this.lotto = this.activatedRoute.snapshot.queryParamMap.get('lotto');
        this.ds = this.dataservice;
        console.log('THIS COMMON SERVICE');
        console.log(this.commonservice.overlayLoadingTemplate);
        this.cs = this.commonservice;
        console.log(this.cs);
    }
}
