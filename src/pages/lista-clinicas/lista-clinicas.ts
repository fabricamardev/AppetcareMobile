import { AgendamentoServicoNovoPage } from './../agendamento-servico-novo/agendamento-servico-novo';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Server } from './../../providers/server';

@Component({
  selector: 'page-lista-clinicas',
  templateUrl: 'lista-clinicas.html',
})
export class ListaClinicasPage {
  
  petsLocations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
  
  }

  ionViewWillEnter() {
    this.buscarClinicas();
  }

  buscarClinicas(){  
    this.server.buscarClinicas()
    .then((lista) => {
      this.petsLocations = lista;
      console.log(this.petsLocations);
      return this.petsLocations
    });
  }


  /**
   * Navegar para detalhes do estabelecimento
   */
  openItem(estabelecimento_id) {
    this.navCtrl.push(AgendamentoServicoNovoPage, {
      estabelecimento_id: estabelecimento_id
    });
  }

}
