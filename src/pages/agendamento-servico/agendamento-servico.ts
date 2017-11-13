import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-agendamento-servico',
  templateUrl: 'agendamento-servico.html',
})
export class AgendamentoServicoPage {
  servico: any = [];
  
  // { id: number, servico_id: number, tutor_id: number, estabelecimento_id: number, pet_id: number, data: string, turno: string, horario: string, servico: string, pet: string, estabelecimento: string } = {
  //   id: undefined,
  //   servico_id: undefined,
  //   tutor_id: undefined,
  //   estabelecimento_id: undefined,
  //   pet_id: undefined,
  //   data: undefined,
  //   turno: undefined,
  //   horario: undefined, 
  //   servico: undefined,
  //   pet: undefined,
  //   estabelecimento: undefined
  // };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.servico = navParams.get('agendamento');
    console.log(this.servico);
  }

  ionViewDidLoad() {
    
  }

}
