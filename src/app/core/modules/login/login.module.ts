import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { FormsModule } from '@angular/forms';
import { SpinnerSharedModule } from 'src/app/shared/modules/spinner/spinner-shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ LoginComponent, LoginContainerComponent ],
  imports: [
    CommonModule, LoginRoutingModule, FormsModule, SpinnerSharedModule, NgbDatepickerModule
  ],
  exports: [ LoginContainerComponent ],
  providers: [ AuthenticationService ]
})
export class LoginModule { }
