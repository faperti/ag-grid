import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './modules/login/login.module';
import { QualitaModule } from './modules/qualita/qualita.module';


@NgModule({
  imports: [
    CommonModule , LoginModule, QualitaModule
  ],
  exports: [ LoginModule, QualitaModule ]
})
export class CoreModule { }
