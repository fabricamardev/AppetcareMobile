import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Server } from './../../providers/server';

@IonicPage()
@Component({
  selector: 'page-lista-clinicas',
  templateUrl: 'lista-clinicas.html',
})
export class ListaClinicasPage {
  
  petsLocations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public server: Server) {
  
  }

  ngAfterViewInit() {
    this.buscarClinicas();
  }

  buscarClinicas(){  
    this.server.buscarClinicas()
    .then((lista) => {
      this.petsLocations = lista;
      console.log(this.petsLocations);
      return this.petsLocations
    });
  }

}
