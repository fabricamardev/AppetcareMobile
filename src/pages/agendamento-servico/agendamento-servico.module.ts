import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoServicoPage } from './agendamento-servico';

@NgModule({
  declarations: [
    AgendamentoServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoServicoPage),
  ],
  exports: [
    AgendamentoServicoPage
  ]
})
export class AgendamentoServicoPageModule {}
