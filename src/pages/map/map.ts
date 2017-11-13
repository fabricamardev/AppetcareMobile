import { AgendamentoServicoNovoPage } from './../agendamento-servico-novo/agendamento-servico-novo';
import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, Platform, ModalController, LoadingController } from 'ionic-angular';
import { Server } from './../../providers/server';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';




declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  // @ViewChild('map') map;

  constructor(
    private googleMaps: GoogleMaps, 
    public navCtrl: NavController, 
    public platform: Platform, 
    private geolocation: Geolocation, 
    public server: Server,
    public modalCtrl: ModalController, 
    public loading: LoadingController,
    private elementRef:ElementRef, private renderer:Renderer
  ) { }


  ngAfterViewInit() {
    this.loadMap();
  }
  

  loadMap(){  
    let loader = this.loading.create({
    content: 'Carregando o mapa...',
    });
  
    let petsLocations: any = [];

    loader.present();
   
    this.server.buscarClinicas()
    .then((lista) => {
      petsLocations = lista;
      console.log(petsLocations);
      return this.geolocation.getCurrentPosition()
    })
    .then((position) => {

      console.log('ONDE EU ESTOU ', position);

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // adiciona as marcas no map
      // let marker = 
      new google.maps.Marker({
        position: latLng,
        title: 'Minha Localização',
        map: this.map
      });

      // marker.addListener('click', function() {
      //   console.log(marker);
      // });

      // for petsLocations cria uma macacao no map
      if(petsLocations && petsLocations.length > 0){
        for(let location of petsLocations){

          let posicao = {
            lat:  parseFloat(location.latitude),
            lng:  parseFloat(location.longitude)
          }; 
          console.log(posicao);

          let contentString = '<div id="content" >'+
                              // '<div><img class="avatar" src="'+ location.image +'" /></div>'+
                              '<h4 id="firstHeading" class="firstHeading"> ' + location.nome + '</h4>'+
                              '<div id="bodyContent">'+
                              '<div></div>'+
                              '<p>' + location.endereco + '</p>'+
                              // '<p>' + location.endereco + ' <button ion-button (click)="'+this.openItem(location.id)+'">'+
                              // 'Saiba mais<button> </p>'+
                              '</div>'+
                              '</div>';

          let infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
          });

          let image = 'assets/img/iconpet.png';
          //adiciona as marcas no map
          let marca = new google.maps.Marker({
            position: posicao,
            title: location.nome,
            map: this.map,
            icon: image
          });
          
          marca.addListener('click', function() {
            console.log(marca);
            infowindow.open(this.map, marca);
          });

        }
      }
      
    }, (erro)=> {console.log(erro)})
    .then(() => {
      loader.dismiss();
    });

  }


  /**
   * Navegar para detalhes do estabelecimento
   */
  openItem(item) {
    console.log("Abriu aqui");

    this.navCtrl.push(AgendamentoServicoNovoPage, {
      item: item
    });
  }

  
}
