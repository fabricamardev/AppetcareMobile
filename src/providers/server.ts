import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from './api';


@Injectable()
export class Server {

  data: any;

  constructor(public http: Http, public api: Api) {
    console.log('Hello Server Provider');
  }


  buscarPets(){
    
    return this.api.get('api/v1/pets')
    .then((res: any) => {
        console.log(res);
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }


  buscarRacas(){
    return this.api.get('api/v1/racas')
    .then((res: any) => {
        console.log(res);
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarEspecies(){
    return this.api.get('api/v1/especies')
    .then((res: any) => {
        console.log(res);
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }




  salvarPet(pet: any){
    return this.api.post('api/v1/pets', pet)
    .then((res: any) => {
        console.log("Salvou o pet");
        console.log(res);
      });
  }


  buscarClinicas(){
    
    return this.api.get('api/v1/estabelecimentos')
    .then((res: any) => {
        console.log("Aqui eh server provider " + res);
        console.log(res.result);
        return res.result;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }


  buscarAgendamentos(){
 
        let dados: any;

        return new Promise(resolve => {
            this.http.get('assets/data/agendamentos.json').map(res => res.json()).subscribe(resultado => {
                dados = resultado.agendamentos
                resolve(dados);
            });
 
        });
 
  }

}
