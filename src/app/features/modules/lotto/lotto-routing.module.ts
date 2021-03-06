import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LottoComponent } from './lotto/lotto.component';
import { LottoDetailComponent } from './lottodetail/lotto.detail.component';
import { LottoanalisiComponent } from './lottoanalisi/lottoanalisi.component';
import { LottocollaudoComponent } from './lottocollaudo/lottocollaudo.component';
import { LottoclientiComponent } from './lottoclienti/lottoclienti.component';
import { LottonoteComponent } from './lottonote/lottonote.component';

const routes: Routes = [
    { path: '', component: LottoComponent ,
    // { path: ':lotto/clienti', component: LottoclientiComponent },
    // { path: ':lotto/analisi', component: LottoanalisiComponent },
    // { path: ':lotto/collaudo', component: LottocollaudoComponent },
    // { path: ':lotto/detail', component: LottoDetailComponent }
    children: [
            {
              path: '',
              redirectTo: 'clienti',
              pathMatch: 'full'
            },
            {
                path: 'clienti',
                component: LottoclientiComponent
            },
            {
                path: 'analisi',
                component: LottoanalisiComponent
            },
            {
                path: 'collaudo',
                component: LottocollaudoComponent
            },
            {
                path: 'detail',
                component: LottoDetailComponent
            },
            {
                path: 'note',
                component: LottonoteComponent
            }
        ]
    }
];


@NgModule({
    imports: [
      RouterModule.forChild(
        routes
      )
    ],
    exports: [
      RouterModule
    ]
  })
export class LottoRoutingModule { }
