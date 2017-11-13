import { PetListaPage } from './../pet-lista/pet-lista';
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, NavController, ViewController, ToastController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Server } from '../../providers/server';
import * as moment from 'moment';


@Component({
  selector: 'page-pet-cadastrar',
  templateUrl: 'pet-cadastrar.html'
})
export class PetCadastrarPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));

  especies: any = [];
  racas: any = [];

  especieId: any;

  pet: { id: number, tutor_id: number, image: string, nome: string, sexo: string, data_nascimento: string, raca_id: number, peso: number } = {
    id: undefined,
    tutor_id: undefined,
    image: undefined,
    nome: undefined,
    sexo: undefined,
    data_nascimento: undefined,
    raca_id: undefined, 
    peso: undefined
  };


  constructor(
    public actionSheetCtrl : ActionSheetController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,  
    public camera: Camera,
    public loading: LoadingController,
    public server: Server
  ) 
  {
    let editPet = this.navParams.get('pet');
    if(editPet){
      this.pet = editPet;
      console.log("Pet detalhes");
      console.log(this.pet);
      // this.buscarPetPorId(this.pet.id);
    }
  }

  ionViewDidLoad() {
    this.buscarRacas();
    this.buscarEspecies();
    console.log(this.usuario);
  }

  buscarEspecies(){
    this.server.buscarEspecies()
    .then((res: any) => {
        this.especies = res.result;
        return this.especies;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarRacas(){
    this.server.buscarRacas()
    .then((res: any) => {
        this.racas = res.result;
        return this.racas;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  //esse menu é para aparecer as opções para captura a foto
  onActionSheet(): void {
    this.actionSheetCtrl.create({
      title: 'selecione a imagem',
      buttons: [
        {
          text: 'Selecione do arquivo',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar a câmera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar'
        }
      ],
    }).present();

  }


  takePicture(sourceType: number): void{
    let cameraOptions: CameraOptions = {
      correctOrientation: true,
      quality: 100,
      saveToPhotoAlbum: false,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 600,
      targetHeight: 600
      
    };

    this.camera.getPicture(cameraOptions)
      .then((imageData) => {
        console.log('Foto: ', imageData);
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.pet.image = base64Image;

        console.log('Foto: ', this.pet.image);
      })
      .catch((err: Error) => console.log('Camera error: ', err));

  }


  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.pet.image = imageData;
      // this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.pet.image + ')'
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }


  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present(toast);
  }
 

  async salvarPet(){

    //criticas
    if(!this.pet.nome){
      this.showToast('Preencha o nome do pet para continuar');
      return;
    }

    if(!this.pet.data_nascimento){
      this.showToast('Preencha a data de nascimento do pet para continuar');
      return;
    }

    //aqui pegamos o usuário já logado para ser cadastrado como tutor
    this.pet.tutor_id = this.usuario.id;

    //aqui convertemos a data pq a api não trata o formato de data, caso esteja errado eh retornado o erro 500
    let myDate = moment(this.pet.data_nascimento).format("DD/MM/YYYY");
    this.pet.data_nascimento = myDate;


    let loader = this.loading.create({
      content: 'Salvando...',
    });

    loader.present();
    this.server.salvarPet(this.pet)
    .then((res) => {
      console.log("resposta da request de salvarpet");
      console.log(res);
      this.navCtrl.pop();
    })
    .catch((erro) => {
      console.log("erro na request de salvar pet");
      console.error(erro);
    })
    .then(() => {
      loader.dismiss();
    });
  }

}
