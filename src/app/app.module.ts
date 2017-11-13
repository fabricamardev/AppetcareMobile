import { MedicamentoPage } from './../pages/medicamento/medicamento';
import { MedicamentoNovoPage } from './../pages/medicamento-novo/medicamento-novo';
import { MedicamentoListaPage } from './../pages/medicamento-lista/medicamento-lista';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
import { PetCadastrarPage } from '../pages/pet-cadastrar/pet-cadastrar';
import { PetDetailPage } from '../pages/pet-detail/pet-detail';
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
import { ListaClinicasPage } from '../pages/lista-clinicas/lista-clinicas';
import { AgendamentoServicoListaPage } from '../pages/agendamento-servico-lista/agendamento-servico-lista';
import { AgendamentoServicoNovoPage } from '../pages/agendamento-servico-novo/agendamento-servico-novo';
import { AgendamentoServicoPage } from '../pages/agendamento-servico/agendamento-servico';
import { LogoutPage } from '../pages/logout/logout';


import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';
import { User } from '../providers/user';
import { Server } from './../providers/server';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MaskInput } from 'mask-ioni-3/mask-input';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list up to date.
 */
let pages = [
  MyApp,
  CardsPage,
  ContentPage,
  PetCadastrarPage,
  PetDetailPage,
  PetListaPage,
  LoginPage,
  MapPage,
  MenuPage,
  SearchPage,
  SignupPage,
  TabsPage,
  TutorialPage,
  WelcomePage,
  PerfilPage,
  TestePage,
  LocalizarClinicaPage, 
  ListaClinicasPage,
  AgendamentoServicoListaPage,
  AgendamentoServicoNovoPage,
  AgendamentoServicoPage,
  LogoutPage, 
  MedicamentoListaPage,
  MedicamentoNovoPage,
  MedicamentoPage,
];

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Api,
    Items,
    User,
    Camera,
    File,
    FilePath,
    Base64,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Network,
    Geolocation,
    Server,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: [declarations(), MaskInput],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule { }
