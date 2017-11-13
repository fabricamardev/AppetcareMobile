import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { Server } from './../../providers/server';
import { AgendamentoServicoListaPage } from "../agendamento-servico-lista/agendamento-servico-lista";



@Component({
  selector: 'page-agendamento-servico-novo',
  templateUrl: 'agendamento-servico-novo.html',
})
export class AgendamentoServicoNovoPage {

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));

  listaEstabelecimentos: any = [];
  listaServicos: any = [];
  listaHorarios: any = [];
  pets: any = [];

  servico: { servico_id: number, tutor_id: number, estabelecimento_id: number, pet_id: number, data: string, turno: string, horario: string } = {
    servico_id: undefined,
    tutor_id: undefined,
    estabelecimento_id: undefined,
    pet_id: undefined,
    data: undefined,
    turno: undefined,
    horario: undefined
  };

  constructor(
    public navCtrl: NavController,
    public alertController : AlertController,
    public toastCtrl: ToastController,
    public viewCtrl : ViewController, 
    public navParams: NavParams, 
    public server: Server) {
      // this.servico.estabelecimento_id = navParams.get('estabelecimento_id');
  }

  ngAfterViewInit() {
    console.log('Iniciando Agendamento de Serviços');
    this.buscarClinica();
    this.buscarPets(this.usuario.id);
  }

  buscarClinica(){
    this.server.buscarClinicas()
    .then((lista) => {
      this.listaEstabelecimentos = lista;
      console.log(this.listaEstabelecimentos);
    });

 }

 carregar(estabelecimento_id: any){
    this.buscarServicos(estabelecimento_id);
    this.buscarHorarios(estabelecimento_id, this.servico.data);
 }

 carregarData(data : any){

    console.log(data);

    if(this.servico.estabelecimento_id){
      this.buscarHorarios(this.servico.estabelecimento_id, data);
    }
 }

  buscarServicos(estabelecimento_id: any){
    this.server.buscarServicos(estabelecimento_id)
    .then((lista: any) => {
      if(lista.length == 0){
        console.log("Não existem serviços cadastrados para essa clínica");
        let alert = this.alertController.create({
          title: 'Atenção',
          subTitle: 'Não existem serviços cadastrados para essa clínica',
          buttons: ['OK']
      });
  
      alert.present();
      }else{
        this.listaServicos = lista;
      }
    });
  }

  buscarHorarios(estabelecimento_id: any, data : any){
    this.server.buscarHorarios(estabelecimento_id, data)
    .then((lista) => {
      if(lista.length == 0){
        console.log("Não existem horários cadastrados para essa clínica");
        let alert = this.alertController.create({
          title: 'Atenção',
          subTitle: 'Não existem horários cadastrados para essa clínica',
          buttons: ['OK']
      });
  
      alert.present();
      }else{
        this.listaHorarios = lista;
        console.log(this.listaHorarios);
      }
      
    });
  }


  buscarPets(tutor_id) {
    this.server.buscarPets(tutor_id)
    .then((lista) => {
      if(lista.result.length == 0){
        console.log("Não existem pets cadastrados para esse tutor");
        let alert = this.alertController.create({
          title: 'Atenção',
          subTitle: 'Não existem pets cadastrados para esse tutor',
          buttons: ['OK']
          //fazer voltar para página inicial
      });
  
      alert.present();
      }else{
        this.pets = lista.result;
      }
    })
    .catch((erro : any) => {
      console.error(erro);
    })
  }


  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present(toast);
  }


  agendar(){
    this.servico.tutor_id = this.usuario.id;

    if(!this.servico.data){
     this.showToast('Preencha a data do agendamento para continuar');
     return;
    }

    if(!this.servico.estabelecimento_id){
      this.showToast('Selecione o estabelecimento para continuar o agendamento');
      return;
    }

    if(!this.servico.pet_id){
      this.showToast('Selecione o pet para continuar o agendamento');
      return;
    }

    if(!this.servico.servico_id){
      this.showToast('Selecione o serviço para continuar o agendamento');
      return;
    }

    if(!this.servico.turno){
      this.showToast('Selecione o turno para continuar o agendamento');
      return;
    }

    if(!this.servico.horario){
      this.showToast('Selecione o horário para continuar o agendamento');
      return;
    }

    if(!this.servico.tutor_id){
      this.showToast('O tutor não foi informando');
      return;
    }
    console.log("Realizando agendamento");
    console.log(this.servico);
    this.server.agendar(this.servico)
    .then((res) => {
      console.log(res);
      this.navCtrl.pop();
    })
    .catch((erro) => {
      console.error(erro);
      this.showToast('Erro ao agendar ' + erro);
      return;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


}
