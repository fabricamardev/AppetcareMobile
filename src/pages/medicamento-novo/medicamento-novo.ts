import { MedicamentoListaPage } from './../medicamento-lista/medicamento-lista';
import { Server } from './../../providers/server';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-medicamento-novo',
  templateUrl: 'medicamento-novo.html',
})
export class MedicamentoNovoPage {

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));
  pets: any = [];
  medicamento: { id: number, nome: string, tipo: string, marca: string, data_uso: string, peso: string, dose: number, pet_id: number } = {
    id: undefined,
    nome: undefined,
    tipo: undefined,
    marca: undefined,
    data_uso: undefined,
    peso: undefined,
    dose: undefined,
    pet_id: undefined
  };

  constructor(
    public navCtrl: NavController, 
    public alertController : AlertController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public viewCtrl : ViewController,  
    public server: Server) {


      let medicamento = navParams.get('medicamento');
      if(medicamento){
        this.medicamento = medicamento;
      }
      console.log(this.medicamento);
  }

  ionViewWillEnter() {
    console.log('Iniciando cadastro de novo medicamento...');
    this.buscarPets(this.usuario.id);
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


  cadastrar(){

    if(!this.medicamento.pet_id){
      this.showToast('Selecione o pet que recebeu a medicação');
      return;
    }

    if(!this.medicamento.peso){
      this.showToast('Informe o peso do pet que recebeu a medicação');
      return;
    }

    if(!this.medicamento.data_uso){
      this.showToast('Informe a data de aplicação do medicamento');
      return;
    }

    if(!this.medicamento.nome){
      this.showToast('Informe o nome do medicamento');
      return;
    }

    if(!this.medicamento.marca){
      this.showToast('Informe a marca do medicamento');
      return;
    }

    if(!this.medicamento.tipo){
      this.showToast('Informe o tipo do medicamento');
      return;
    }

    if(!this.medicamento.dose){
      this.showToast('Informe a dose menistrada do medicamento');
      return;
    }

    console.log(this.medicamento);

    this.server.salvarMedicamento(this.medicamento)
    .then((res) => {
      console.log(res);
      this.navCtrl.pop();
    })
    .catch((erro) => {
      console.error(erro);
      this.showToast('Não foi possível realizar o cadastro');
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
