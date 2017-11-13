
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AgendamentoServicoNovoPage } from '../agendamento-servico-novo/agendamento-servico-novo';
import { AgendamentoServicoPage } from '../agendamento-servico/agendamento-servico';
import { Server } from './../../providers/server';


@Component({
  selector: 'page-agendamento-servico-lista',
  templateUrl: 'agendamento-servico-lista.html',
})
export class AgendamentoServicoListaPage {

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));
  agendamentos: any = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public server: Server, public loading: LoadingController) {
    
  }

  ionViewWillEnter() {
    this.buscarAgendamentos(this.usuario.id);
  }


  async buscarAgendamentos(tutor_id){  
    let loader = this.loading.create({
      content: 'Carregando...',
    });
    loader.present();
    try {
      
      this.agendamentos = await this.server.buscarAgendamentos(tutor_id);

      await Promise.all(this.agendamentos.map(async (age) => {
        let servico = await this.server.buscarServicosPorId(age.servico_id);
        age.servico = servico.nome;
        age.servicoVl = servico.valor;
        age.servicoDesc = servico.descricao;
        let pet = await this.server.buscarPetPorId(age.pet_id);
        age.pet = pet.nome;
        age.petDtNasc = pet.data_nascimento;
        age.petPeso = pet.peso;
        age.petSexo = pet.sexo;

        let estabelecimento = await this.server.buscarEstabelecimentoPorId(age.estabelecimento_id);
        age.estabelecimento = estabelecimento.nome;
        age.estabelecimentoEnd = estabelecimento.endereco;
        
      }));

    } catch (error) {
      console.error(error);
    }
    loader.dismiss();
  }


  addAgendamento() : void{
    this.navCtrl.push(AgendamentoServicoNovoPage);
  }

  editarAgendamento(agendamento){
    this.navCtrl.push(AgendamentoServicoNovoPage, {
        agendamento: agendamento
      });

  }


  openAgendamento(agendamento) {
    this.navCtrl.push(AgendamentoServicoPage, {
      agendamento: agendamento
    });
  }


  deleteAgendamento(agendamento) {
    try {
      this.server.deletarAgendamento(agendamento.id);
    } catch (error) {
      console.log(error);
    }
    this.buscarAgendamentos(this.usuario.id);
    console.log("Apagando agendamento");
  }

  

}






