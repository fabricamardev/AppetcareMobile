import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { PetCadastrarPage } from '../pet-cadastrar/pet-cadastrar';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  items : any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items
  , public modalCtrl: ModalController) {
    this.items = items;
    this.item = navParams.get('item') || items.defaultItem;
  }

  editItem() {
    let editModal = this.modalCtrl.create(PetCadastrarPage);
    editModal.onDidDismiss(item => {
      if (item) {
        this.items.edit(item);
      }
    })
    editModal.present();
  }

}
