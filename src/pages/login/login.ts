import { Component } from '@angular/core';
import { NavController, ToastController, MenuController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: undefined,
    password: undefined
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false);
      this.translateService.get('Não foi possível entrar na sua conta. Verifique seus dados e tente novamente.').subscribe((value) => {
      this.loginErrorString = value;
    })
  }


  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).then((resp) => {
      this.menuCtrl.enable(true);
      this.navCtrl.push(MainPage);
    })
    .catch ((err) => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.log("Erro " + err);
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
