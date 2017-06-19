import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { PetCadastrarPage } from '../pet-cadastrar/pet-cadastrar';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Items } from '../../providers/providers';

import { Item } from '../../models/item';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-pet-lista',
  templateUrl: 'pet-lista.html'
})
export class PetListaPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, private network: Network) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(PetCadastrarPage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }


  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
