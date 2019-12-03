import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

// Router navigation
import { RouterModule, Routes } from '@angular/router';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { GridComponentComponent } from './grid-component/grid-component.component';
import { LottoModule } from './lotto/lotto.module';


import { LottoComponent } from './lotto/lotto/lotto.component';
import { GridRiassegnazioniComponent } from './grid-riassegnazioni-component/grid-riassegnazioni.component';
import { GridNuoveAssegnazioniComponent } from './grid-nuove-assegnazioni-component/grid-nuove-assegnazioni.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Parent1Component } from './parent1/parent1.component';
import { Parent2Component } from './parent2/parent2.component';
import { Parent3Component } from './parent3/parent3.component';

import { RouterLinkRendererComponent } from './router-link-renderer/router-link-renderer.component';
import { AnchorEventClickRendererComponent } from './anchor-event-click-renderer/anchor-event-click-renderer.component';

import { NavbarComponent } from './navbar/navbar.component';
import { NavbarlottoComponent } from './navbarlotto/navbarlotto.component';
import { SearchRiassegnazioniComponent } from './search-riassegnazioni/search-riassegnazioni.component';
import { ElaboratoAssegnazioneRendererComponent } from './elaborato-assegnazione-renderer/elaborato-assegnazione-renderer.component';

const appRoutes: Routes = [
  { path: 'grid', component: GridComponentComponent },
  { path: 'lotto/:lotto', component: LottoComponent },
  { path: 'parent1', component: Parent1Component },
  { path: 'riassegnazioni', component: GridRiassegnazioniComponent },
  { path: 'parent2', component: Parent2Component },
  { path: 'parent3', component: Parent3Component },
  { path: '',
    redirectTo: '/parent1',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // other imports here
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpClientModule,
    LottoModule,
    AgGridModule.withComponents([])
  ],
  entryComponents: [ RouterLinkRendererComponent, AnchorEventClickRendererComponent, ElaboratoAssegnazioneRendererComponent ],
  declarations: [AppComponent, SearchComponentComponent, GridComponentComponent, GridRiassegnazioniComponent,
    GridNuoveAssegnazioniComponent,
    Parent1Component, Parent2Component, Parent3Component,
    PageNotFoundComponent, RouterLinkRendererComponent, AnchorEventClickRendererComponent,
     NavbarComponent, SearchRiassegnazioniComponent, ElaboratoAssegnazioneRendererComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
