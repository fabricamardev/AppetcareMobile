import { Server } from './../../providers/server';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { PetCadastrarPage } from '../pet-cadastrar/pet-cadastrar';

@Component({
  selector: 'page-pet-detail',
  templateUrl: 'pet-detail.html'
})
export class PetDetailPage {
  pet: { id: number, tutor_id: number, image: string, nome: string, sexo: string, data_nascimento: string, raca_id: number, raca: string, especie:string, peso: number } = {
    id: undefined,
    tutor_id: undefined,
    image: undefined,
    nome: undefined,
    sexo: undefined,
    data_nascimento: undefined,
    raca_id: undefined,
    raca: undefined, 
    especie: undefined,
    peso: undefined
  };

  raca : any = {
    id: undefined,
    especie_id: undefined,
    nome: undefined,
    especie: {
        id: undefined,
        nome: undefined
    }};


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public loading: LoadingController,
    public server: Server) {
        this.pet.id = this.navParams.get('id');
        console.log("Pet detalhes");
        console.log(this.pet);
        this.buscarPetPorId(this.pet.id);
  }



  buscarPetPorId(pet_id){

    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present();
    this.server.buscarPetPorId(pet_id)
    .then((res: any) => {
      this.pet = res;
      return this.pet;
    })
    .then(dados => {
       return this.buscarRacaPorId(this.pet.raca_id);
    })
    .catch((erro) => {
      console.log(erro);
    })
    .then(() => {
      loader.dismiss();
    });
  }

  buscarRacaPorId(raca_id){
    this.server.buscarRacaPorId(raca_id)
      .then((res: any) => {
        this.raca = res;
        return this.raca;
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  

  editItem() {
    let editModal = this.modalCtrl.create(PetCadastrarPage);
    editModal.onDidDismiss(pet => {
    })
    editModal.present();
  }

}
