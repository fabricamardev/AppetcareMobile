
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { PetCadastrarPage } from '../pet-cadastrar/pet-cadastrar';
import { PetDetailPage } from '../pet-detail/pet-detail';

import { Server } from '../../providers/server';

import { Item } from '../../models/item';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-pet-lista',
  templateUrl: 'pet-lista.html'
})
export class PetListaPage {
  pets: any = [];
  pet: {
    'nome' : undefined,
    'dt_nascimento' : undefined,
    'sexo' : undefined,
    'especie' : undefined,
    'raca' : undefined 
  };

  constructor(
    public navCtrl: NavController, 
    public server: Server, 
    public modalCtrl: ModalController, 
    private network: Network) {

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {

  }

  buscarPets() {
    this.server.buscarPets()
    .then((lista) => {
      this.pets = lista;
      console.log(this.pets);
    })
    .catch((erro : any) => {
      console.error(erro);
    })
  }


  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(PetCadastrarPage);
    addModal.onDidDismiss(pet => {
      if (pet) {
        this.pets.add(pet);
      }
    })
    addModal.present();
  }


  /**
   * Delete an item from the list of items.
   */
  deleteItem(pet) {
    this.pets.delete(pet);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openPet(pet) {
    this.navCtrl.push(PetDetailPage, {
      pet: pet
    });
  }
}
