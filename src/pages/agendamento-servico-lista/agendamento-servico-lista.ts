
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AgendamentoServicoNovoPage } from './../agendamento-servico-novo/agendamento-servico-novo';
import { AgendamentoServicoPage } from './../agendamento-servico/agendamento-servico';
import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { Server } from './../../providers/server';


@IonicPage()
@Component({
  selector: 'page-agendamento-servico-lista',
  templateUrl: 'agendamento-servico-lista.html',
})
export class AgendamentoServicoListaPage {
  agendamentos: any = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public server: Server) {
    
  }

  ionViewDidLoad() {
    this.buscarAgendamentos();
  }


  buscarAgendamentos(){  
    this.server.buscarClinicas()
    .then((lista) => {
      this.agendamentos = lista;
      console.log(this.agendamentos);
      return this.agendamentos
    });
  }


  openItem(agendamento) {
    this.navCtrl.push(AgendamentoServicoPage, {
      item: agendamento
    });
  }

  

}






