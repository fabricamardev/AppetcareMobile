import { MedicamentoPage } from './../medicamento/medicamento';
import { MedicamentoNovoPage } from './../medicamento-novo/medicamento-novo';
import { Server } from './../../providers/server';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as moment from 'moment';


@Component({
  selector: 'page-medicamento-lista',
  templateUrl: 'medicamento-lista.html',
})
export class MedicamentoListaPage {
  listamedicamentos: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server, public loading: LoadingController) {
    
  }


  ionViewWillEnter() {
    this.buscarMedicamentos();
  }


  async buscarMedicamentos(){
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present();  
    try {
      this.listamedicamentos =  await this.server.buscarMedicamentos();
    } catch (error) {
      console.error(error);
    }
    
    loader.dismiss();
    
  }


  addMedicamento(){
    this.navCtrl.push(MedicamentoNovoPage);
  }

  editarMedicamento(medicamento): void{
    let myDate = moment(medicamento.data_uso).format("YYYY-MM-DD");
    medicamento.data_uso = myDate;
    console.log(medicamento);
    this.navCtrl.push(MedicamentoNovoPage, {
      medicamento: medicamento
    });
  }


  openMedicamento(medicamento) {
    this.navCtrl.push(MedicamentoPage, {
      medicamento: medicamento
    });
  }


  deleteMedicamento(medicamento) {
    try {
      this.server.deletarMedicamento(medicamento.id);
      
    } catch (erro) {
      console.log(erro);
    }
    this.buscarMedicamentos();
  }

  

}

