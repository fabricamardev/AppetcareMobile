import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { Server } from '../../providers/server';


@Component({
  selector: 'page-pet-cadastrar',
  templateUrl: 'pet-cadastrar.html'
})
export class PetCadastrarPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  especies: any = [];
  racas: any = [];

  especieId: any;

  form: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    formBuilder: FormBuilder, 
    public camera: Camera,
    public server: Server
  ) 
  {

      this.form = formBuilder.group({
        profilePic: [''],
        nome: ['', Validators.required],
        dt_nascimento: [''], 
        sexo: [''],
        especie: [],
        raca: []
      });

      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });
  }

  ionViewDidLoad() {
    this.buscarRacas();
    this.buscarEspecies();
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
 

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        // alert('Unable to take photo');
        console.log('Unable to take photo' + err);
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }

  salvarPet(){
    console.log(this.form);
    // this.server.salvarPet(pet)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((erro) => {
    //   console.error(erro);
    // });
  }

}
