import { MapPage } from './../map/map';
import { ListaClinicasPage } from './../lista-clinicas/lista-clinicas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-localizar-clinica',
  templateUrl: 'localizar-clinica.html',
})
export class LocalizarClinicaPage {

  tab1Root: any = MapPage;
  tab2Root: any = ListaClinicasPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalizarClinicaPage');
  }

}
