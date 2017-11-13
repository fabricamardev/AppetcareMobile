
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { FirstRunPage } from '../pages/pages';
import { PetListaPage } from '../pages/pet-lista/pet-lista';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { MenuPage } from '../pages/menu/menu';
import { SearchPage } from '../pages/search/search';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';
import { PerfilPage } from '../pages/perfil/perfil';
import { TestePage } from '../pages/teste/teste';
import { LocalizarClinicaPage } from '../pages/localizar-clinica/localizar-clinica';
import { MedicamentoListaPage } from '../pages/medicamento-lista/medicamento-lista';
import { AgendamentoServicoListaPage } from './../pages/agendamento-servico-lista/agendamento-servico-lista';
import { LogoutPage } from '../pages/logout/logout';


import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  loggedin = (window.localStorage.getItem('token') ? true : false);
  rootPage = (window.localStorage.getItem('token') ? PetListaPage : LoginPage);

  // loggedin = true;
  // rootPage = PetListaPage;

  pages: any[] = [
        { title: 'Appetcare', component: PetListaPage, icon: 'home'},
        { title: 'Perfil', component: PerfilPage, icon: 'person'},
        { title: 'Agendamentos de serviços', component: AgendamentoServicoListaPage, icon: 'calendar'},
        { title: "Pet's", component: PetListaPage, icon: 'paw'},
        // { title: 'Consultas', component: TestePage, icon: 'medical'},
        { title: 'Localizar Petshop', component: LocalizarClinicaPage, icon: 'pin'},
        // { title: 'Sobre', component: TestePage, icon: 'information-circle'},
        // { title: 'Localizar ONGs', component: TestePage, icon: 'locate'},
        // { title: 'Vacinas', component: TestePage, icon: 'thermometer'},
        // { title: 'Vermifugo', component: TestePage, icon: 'flask'},
        { title: 'Medicamentos', component: MedicamentoListaPage, icon: 'medkit'},
        { title: 'Sair', component: LogoutPage, icon: 'exit'},
        // { title: 'Tutorial', component: TutorialPage },
        // { title: 'Welcome', component: WelcomePage },
        // { title: 'Tabs', component: TabsPage },
        // { title: 'Cards', component: CardsPage },
        // { title: 'Content', component: ContentPage },
        // { title: 'Login', component: LoginPage },
        // { title: 'Signup', component: SignupPage },
        // { title: 'Map', component: MapPage },
        // { title: 'Menu', component: MenuPage },
        // { title: 'Search', component: SearchPage }
  ]

  constructor(
    private translate: TranslateService, 
    private platform: Platform, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen) {
    
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
      
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
