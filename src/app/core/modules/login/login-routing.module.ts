import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainerComponent } from './containers/login-container/login-container.component';

const appRoutes: Routes = [
  { path: '',  component: LoginContainerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}
