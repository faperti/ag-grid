import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule} from './AppRoutingModule';

// Router navigation
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

// ag-grid
// import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterLinkRendererComponent } from './router-link-renderer/router-link-renderer.component';
import { AnchorEventClickRendererComponent } from './anchor-event-click-renderer/anchor-event-click-renderer.component';
import { ElaboratoAssegnazioneRendererComponent } from './elaborato-assegnazione-renderer/elaborato-assegnazione-renderer.component';
// tslint:disable-next-line:max-line-length
import { AccodaGenerazioneCertificatoRendererComponent } from './renderers/accodaGenerazioneCertificatoRenderer/AccodaGenerazioneCertificatoRenderer';
import { HeaderGridComponent } from './header-grid-component/header-grid-component.component';

import { AuthDataService } from './shared/services/AuthData.service';
import { DataService } from './shared/services/data.service';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { LottoModule } from './features/modules/lotto/lotto.module';
import { SpinnerSharedModule } from './shared/modules/spinner/spinner-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from './shared/services/common.service';

@NgModule({
    imports: [
      AppRoutingModule,
      CoreModule,
      FeaturesModule,
      // other imports here
      BrowserModule,
      FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
      HttpClientModule,
      LottoModule,
      SpinnerSharedModule,
      ReactiveFormsModule
  ],
  entryComponents: [ RouterLinkRendererComponent, AnchorEventClickRendererComponent,
    ElaboratoAssegnazioneRendererComponent, AccodaGenerazioneCertificatoRendererComponent, HeaderGridComponent ],
  declarations: [AppComponent,
    PageNotFoundComponent,
    RouterLinkRendererComponent,
    AnchorEventClickRendererComponent,
    // NavbarComponent,
     // SearchRiassegnazioniComponent,
     ElaboratoAssegnazioneRendererComponent,
     AccodaGenerazioneCertificatoRendererComponent,
     HeaderGridComponent
      ],
  bootstrap: [AppComponent],
  providers: [AuthDataService, DataService, CommonService]
})
export class AppModule {}
