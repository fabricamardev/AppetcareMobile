import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, fone: string, cpf: string, password: string } = {
    name: undefined,
    email: undefined,
    fone: undefined,
    cpf: undefined,
    password: undefined
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account)
    .then((resp) => {
      this.navCtrl.push(MainPage);
    })
    .catch ((err) => {
      // Unable to sign up
      let toast = this.toastCtrl.create({
         message: this.signupErrorString,
         duration: 3000,
         position: 'top'
      });
      toast.present();
      console.log("Erro " + err);
    });
  }
}
