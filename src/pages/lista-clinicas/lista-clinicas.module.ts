import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaClinicasPage } from './lista-clinicas';

@NgModule({
  declarations: [
    ListaClinicasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaClinicasPage),
  ],
  exports: [
    ListaClinicasPage
  ]
})
export class ListaClinicasPageModule {}
