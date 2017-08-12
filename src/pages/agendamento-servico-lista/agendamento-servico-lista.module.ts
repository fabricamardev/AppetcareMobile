import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoServicoListaPage } from './agendamento-servico-lista';

@NgModule({
  declarations: [
    AgendamentoServicoListaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoServicoListaPage),
  ],
  exports: [
    AgendamentoServicoListaPage
  ]
})
export class AgendamentoServicoListaPageModule {}
