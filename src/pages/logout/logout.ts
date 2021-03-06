import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('usuario');
    this.navCtrl.push(LoginPage);
    console.log('Saindo do Aplicativo');
  }

}
