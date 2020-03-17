import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Parent1Module } from './modules/parent1/parent1.module';
import { RicercaContainerModule } from './modules/ricerca-container/RicercaContainerModule';
import { Parent2Module } from './modules/parent2/parent2.module';
import { ImportaRiassegnazioniModule } from './modules/parent3/importa-riassegnazioni.module';
import { RiassegnazioniContainerComponent } from './containers/riassegnazioni-container/riassegnazioni-container.component';
// tslint:disable-next-line:max-line-length
import { ImportaRiassegnazioniContainerComponent } from './containers/importa-riassegnazioni-container/importa-riassegnazioni-container.component';
import { SearchRiassegnazioniComponent } from '../shared/components/search-riassegnazioni/search-riassegnazioni.component';
import { CertificatoProveContainerComponent } from './containers/certificato-prove-container/certificato-prove-container.component';
import { CertificatoProveModule } from './modules/certificatoprove/certificatoprove.module';

@NgModule({
  declarations: [ RiassegnazioniContainerComponent, ImportaRiassegnazioniContainerComponent, CertificatoProveContainerComponent ],
  imports: [
    CommonModule, Parent1Module, Parent2Module, ImportaRiassegnazioniModule, RicercaContainerModule, CertificatoProveModule
  ],
  exports: [ ]
})
export class FeaturesModule { }
