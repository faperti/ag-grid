import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModule } from './core/modules/login/login.module';
import { QualitaModule } from './core/modules/qualita/qualita.module';
import { QualitaContainerComponent } from './core/modules/qualita/components/qualita-container/qualita-container.component';

import { RicercaContainerComponent } from './features/containers/ricerca-container/ricerca-container.component';
import { LottoModule } from './features/modules/lotto/lotto.module';
import { LottoComponent } from './features/modules/lotto/lotto/lotto.component';
import { RiassegnazioniContainerComponent } from './features/containers/riassegnazioni-container/riassegnazioni-container.component';
import { AuthGuard } from './auth/auth.guard';
// tslint:disable-next-line:max-line-length
import { ImportaRiassegnazioniContainerComponent } from './features/containers/importa-riassegnazioni-container/importa-riassegnazioni-container.component';
// tslint:disable-next-line:max-line-length
import { CertificatoProveContainerComponent } from './features/containers/certificato-prove-container/certificato-prove-container.component';
import { AttachmentComponent } from './shared/components/attachment/attachment.component';

const appRoutes: Routes = [
  { path: 'login', loadChildren: () => LoginModule },
  { path: 'qualita', component: QualitaContainerComponent, canActivate: [AuthGuard],
  children: [
    { path: 'parent1', component: RicercaContainerComponent, canActivate: [AuthGuard] } ,
    { path: 'parent1/:id', component: AttachmentComponent },
    { path: 'parent2', component: RiassegnazioniContainerComponent, canActivate: [AuthGuard] },
    { path: 'parent3', component: ImportaRiassegnazioniContainerComponent, canActivate: [AuthGuard] },
    { path: 'certificatoprove', component: CertificatoProveContainerComponent },
    // { path: 'lotto', component: LottoComponent},
    { path: 'lotto', loadChildren: () => LottoModule }
  ] },

  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
