import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendamentoServicoNovoPage } from './agendamento-servico-novo';

@NgModule({
  declarations: [
    AgendamentoServicoNovoPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendamentoServicoNovoPage),
  ],
  exports: [
    AgendamentoServicoNovoPage
  ]
})
export class AgendamentoServicoNovoPageModule {}
