import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualitaContainerComponent } from 'src/app/core/modules/qualita/components/qualita-container/qualita-container.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ QualitaContainerComponent , NavbarComponent ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [ QualitaContainerComponent ]
})
export class QualitaModule { }
