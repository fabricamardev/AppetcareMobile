import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Server } from "../../providers/server";

@Component({
  selector: 'page-medicamento',
  templateUrl: 'medicamento.html',
})
export class MedicamentoPage {

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server,) {
    this.medicamento = navParams.get('medicamento');
    console.log(this.medicamento);
  }


  buscarPetPorId(pet_id){
    this.server.buscarPetPorId(pet_id)
    .then((res: any) => {
      return res;
    })
    .catch((erro) => {
      console.log(erro);
    })
    
  }

}
