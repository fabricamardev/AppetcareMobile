import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { PetCadastrarPage } from '../pet-cadastrar/pet-cadastrar';
import { PetDetailPage } from '../pet-detail/pet-detail';

import { Server } from '../../providers/server';

import { Network } from '@ionic-native/network';
import * as moment from 'moment';

@Component({
  selector: 'page-pet-lista',
  templateUrl: 'pet-lista.html'
})
export class PetListaPage {

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));

  pets: any = [];

  raca : any = {
            "id": undefined,
            "especie_id": undefined,
            "nome": undefined,
            "especie": {
                "id": undefined,
                "nome": undefined
          }
}

 

  constructor(
    public navCtrl: NavController, 
    public server: Server, 
    public modalCtrl: ModalController, 
    public loading: LoadingController,
    private network: Network) {
      
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewWillEnter() {
    this.buscarPets(this.usuario.id);    
  }

  buscarPets(tutor_id) {

    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present();
    this.server.buscarPets(tutor_id)
    .then((lista) => {
      console.log(lista.result);
      this.pets = lista.result;
      console.log(this.pets);
    })
    .catch((erro : any) => {
      console.error(erro);
    })
    .then(() => {
      loader.dismiss();
    });
  }


  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    // let addModal = this.modalCtrl.create(PetCadastrarPage);
    // addModal.onDidDismiss(pet => {
    //   if (pet) {
    //     this.pets.add(pet);
    //   }
    // })
    // addModal.present();
    this.navCtrl.push(PetCadastrarPage);
    
  }

  editarPet(pet){

    let myDate = moment(pet.data_nascimento).format("YYYY-MM-DD");
    pet.data_nascimento = myDate;
    this.navCtrl.push(PetCadastrarPage, {
      pet: pet
    });
  }

  deletarPet(pet) {
    this.server.deletarPet(pet.id)
    .then((res: any) => {
      console.log("Objeto deletado");
      console.log(res);
      this.buscarPets(this.usuario.id);
      return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  
   
  openPet(pet) {
    this.navCtrl.push(PetDetailPage, {
      id: pet.id
    });
  }
}
