import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginModule } from './core/modules/login/login.module';
import { QualitaModule } from './core/modules/qualita/qualita.module';
import { QualitaContainerComponent } from './core/modules/qualita/components/qualita-container/qualita-container.component';

import { RicercaContainerComponent } from './features/containers/ricerca-container/ricerca-container.component';
// import { LottoModule } from './features/modules/lotto/lotto.module';
import { LottoComponent } from './features/modules/lotto/lotto/lotto.component';
import { AuthGuard } from './auth/auth.guard';
// tslint:disable-next-line:max-line-length
import { ImportaRiassegnazioniContainerComponent } from './features/containers/importa-riassegnazioni-container/importa-riassegnazioni-container.component';
import { LoginContainerComponent } from './core/modules/login/containers/login-container/login-container.component';
import { CodaStampaContainerComponent } from './features/containers/coda-stampa-container/coda-stampa-container.component';
import { TestContainerComponent } from './features/containers/test-container/test-container.component';
// AOT - JIT
// npm -i light-server -g --save
// light-server -s dist/my-app-aggrid -p 4201
const appRoutes: Routes = [
  { path: 'login', component: LoginContainerComponent },
  { path: 'qualita', component: QualitaContainerComponent, canActivate: [AuthGuard],
  children: [
    { path: 'parent1', component: RicercaContainerComponent, canActivate: [AuthGuard] } ,
    { path: 'parent3', component: ImportaRiassegnazioniContainerComponent, canActivate: [AuthGuard] },
    { path: 'lotto', loadChildren: () => import('./features/modules/lotto/lotto.module').then(m => m.LottoModule) },
    { path: 'codastampa', component: CodaStampaContainerComponent },
    { path: 'test', component: TestContainerComponent }
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
