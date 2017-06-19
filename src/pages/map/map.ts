import { TestePage } from './../teste/teste';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { Server } from './../../providers/server';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
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

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController
  , public platform: Platform, private geolocation: Geolocation, public server: Server
  ,public modalCtrl: ModalController) { }


  ngAfterViewInit() {
    this.loadMap();
  }
  

  loadMap(){  
    let petsLocations = [];

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
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // adiciona as marcas no map
      let marker = new google.maps.Marker({
        position: latLng,
        title: 'Minha Localização',
        map: this.map
      });

      marker.addListener('click', function() {
        console.log(marker);
        alert('uruuuu clicou em ' + marker.nome);
      });

      // for petsLocations cria uma macacao no map
      for(let location of petsLocations){

        let posicao = {
          lat:  location.latitude,
          lng:  location.longitude
        }; 
        console.log(posicao);

        let infowindow = new google.maps.InfoWindow({
          content: location.nome,
          maxWidth: 200
        });

        let image = '../assets/img/iconpet.png';
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
          // let addModal = this.modalCtrl.create(TestePage);
          // addModal.onDidDismiss(item => {
          //   if (item) {
          //     this.items.add(item);
          //   }
          // })
          // addModal.present();
        });

      }

    }, (erro)=> {console.log(erro)});
  };

  // loadMap() {
  //   // make sure to create following structure in your view.html file
  //   // and add a height (for example 100%) to it, else the map won't be visible
  //   // <ion-content>
  //   //  <div #map id="map" style="height:100%;"></div>
  //   // </ion-content>

  //   // create a new map by passing HTMLElement
  //   let element: HTMLElement = document.getElementById('map');

  //   let map: GoogleMap = this.googleMaps.create(element);

  //   // listen to MAP_READY event
  //   // You must wait for this event to fire before adding something to the map or modifying it in anyway
  //   map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

  //   // create LatLng object
  //   let ionic: LatLng = new LatLng(43.0741904, -89.3809802);

  //   // create CameraPosition
  //   let position: CameraPosition = {
  //     target: ionic,
  //     zoom: 18,
  //     tilt: 30
  //   };

    // move the map's camera to position
    // map.moveCamera(position);

    // create new marker
    //  let markerOptions: MarkerOptions = {
    //    position: ionic,
    //    title: 'Ionic'
    //  };

    //  const marker: Marker = map.addMarker(markerOptions)
    //    .then((marker: Marker) => {
    //       marker.showInfoWindow();
    //     });
    //  }

    // initJSMaps(mapEle) {
    //   new google.maps.Map(mapEle, {
    //     center: { lat: 43.071584, lng: -89.380120 },
    //     zoom: 16
    //   });
    // }

    // initNativeMaps(mapEle) {
    //   this.map = new GoogleMap(mapEle);
    //   mapEle.classList.add('show-map');

    //   GoogleMap.isAvailable().then(() => {
    //     const position = new GoogleMapsLatLng(43.074395, -89.381056);
    //     this.map.setPosition(position);
    //   });
    // }

    // ionViewDidLoad() {
    //   let mapEle = this.map.nativeElement;

    //   if (!mapEle) {
    //     console.error('Unable to initialize map, no map element with #map view reference.');
    //     return;
    //   }

    //   // Disable this switch if you'd like to only use JS maps, as the APIs
    //   // are slightly different between the two. However, this makes it easy
    //   // to use native maps while running in Cordova, and JS maps on the web.
    //   if (this.platform.is('cordova') === true) {
    //     this.initNativeMaps(mapEle);
    //   } else {
    //     this.initJSMaps(mapEle);
    //   }
    // }

  // }
}
