import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { LottoDataService } from './lotto-data.service';
import { LottonumerositaproveComponent } from './lottonumerositaprove/lottonumerositaprove.component';
import { LottonoteComponent } from './lottonote/lottonote.component';
import { NoteClienteRendererComponent } from './lottoclienti/NoteClienteRenderer/NoteClienteRenderer';
import { ModalModule } from 'src/app/shared/modules/modal/modal.module';

@NgModule({
  declarations: [LottoComponent, LottonavbarComponent, LottoanalisiComponent, NoteClienteRendererComponent,
    LottocollaudoComponent, LottoDetailComponent, LottoclientiComponent, LottonumerositaproveComponent, LottonoteComponent],
  entryComponents: [ NoteClienteRendererComponent ],
  imports: [
    FormsModule,
    CommonModule,
    LottoRoutingModule,
    ModalModule,
    AgGridModule.withComponents([])
  ],
  providers: [ LottoDataService ]
})
export class LottoModule { }
