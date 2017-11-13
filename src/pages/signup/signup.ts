import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { User } from '../../providers/user';
import { TranslateService } from '@ngx-translate/core';
import { PetListaPage } from "../pet-lista/pet-lista";



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

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
    public loading: LoadingController,
    public translateService: TranslateService,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false);

    this.translateService.get('Não foi possível realizar o cadastro, verifique sua conexão').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    let loader = this.loading.create({
      content: 'Cadastrando...',
    });

    loader.present();
    this.user.signup(this.account)
    .then((resp) => {
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(PetListaPage);
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
    })
    .then(() => {
      loader.dismiss();
    });
  }

  cancelar() : void{
    this.navCtrl.pop();
  }
}
