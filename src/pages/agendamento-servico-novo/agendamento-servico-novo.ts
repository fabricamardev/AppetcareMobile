import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Server } from './../../providers/server';


@IonicPage()
@Component({
  selector: 'page-agendamento-servico-novo',
  templateUrl: 'agendamento-servico-novo.html',
})
export class AgendamentoServicoNovoPage {

  listaEstabelecimentos: any = [];
  estabelecimentoId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public server: Server) {
  }

  ngAfterViewInit() {
    console.log('Iniciando Agendamento de Serviços');
    this.buscarClinica();
  }

  buscarClinica(){
    this.server.buscarClinicas()
    .then((lista) => {
      this.listaEstabelecimentos = lista;
      console.log(this.listaEstabelecimentos);
    });

 }


}
