import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalizarClinicaPage } from './localizar-clinica';

@NgModule({
  declarations: [
    LocalizarClinicaPage,
  ],
  imports: [
    IonicPageModule.forChild(LocalizarClinicaPage),
  ],
  exports: [
    LocalizarClinicaPage
  ]
})
export class LocalizarClinicaPageModule {}
