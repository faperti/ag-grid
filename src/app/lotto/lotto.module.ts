import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottoComponent } from './lotto/lotto.component';
import { LottonavbarComponent } from './lottonavbar/lottonavbar.component';
import { LottoanalisiComponent } from './lottoanalisi/lottoanalisi.component';
import { LottocollaudoComponent } from './lottocollaudo/lottocollaudo.component';
import { LottoDetailComponent } from './lottodetail/lotto.detail.component';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';

import { LottoRoutingModule } from './lotto-routing.module';
import { LottoclientiComponent } from './lottoclienti/lottoclienti.component';

@NgModule({
  declarations: [LottoComponent, LottonavbarComponent, LottoanalisiComponent,
    LottocollaudoComponent, LottoDetailComponent, LottoclientiComponent],
  imports: [
    CommonModule,
    LottoRoutingModule,
    AgGridModule.withComponents([])
  ]
})
export class LottoModule { }
