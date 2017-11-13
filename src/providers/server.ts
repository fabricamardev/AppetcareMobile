import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Api } from './api';
import * as moment from 'moment';


@Injectable()
export class Server {

  data: any;

  usuario: any = JSON.parse(window.localStorage.getItem('usuario'));

  constructor(public http: Http, public api: Api) {
    console.log('Hello Server Provider');
  }




  //============================
  //  Pets
  //============================
  buscarPets(tutor_id){

    return this.api.get('api/v1/pets?where[tutor_id]='+tutor_id)
    .then((res: any) => {
        console.log(res);
        
        res.result.map((pet : any) => {
          pet.data_nascimento = moment(pet.data_nascimento).format("DD/MM/YYYY");
          if(!pet.image){
            pet.image = 'assets/img/foto-perfil-cachorro.png';
          }
            
          
        });
          
        
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarPetPorId(pet_id){
    return this.api.get('api/v1/pets/'+pet_id)
    .then((res: any) => {
        
          res.data_nascimento = moment(res.data_nascimento).format("DD/MM/YYYY");
          if(!res.image){
            res.image = 'assets/img/foto-perfil-cachorro.png';
          }
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  salvarPet(pet: any){

    if(pet.id){
      return this.api.put('api/v1/pets/'+pet.id, pet)
      .then((res: any) => {
          console.log("Salvou o pet");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }else{
      return this.api.post('api/v1/pets', pet)
      .then((res: any) => {
          console.log("Editou o pet");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }



  }


  deletarPet(pet_id){
    return this.api.delete('api/v1/pets/'+pet_id)
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }


  buscarRacas(){
    return this.api.get('api/v1/racas')
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarRacaPorId(raca_id){
    return this.api.get('api/v1/racas/'+raca_id)
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarEspecies(){
    return this.api.get('api/v1/especies')
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarEspeciesPorId(especie_id){
    return this.api.get('api/v1/especies?where[id]='+especie_id)
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  

  buscarClinicas(){
    
    return this.api.get('api/v1/estabelecimentos')
    .then((res: any) => {
        console.log("Aqui eh server provider " + res);
        console.log(res.result);
        res.result.map((clinica : any) => {
          if(!clinica.imagem){
            clinica.image = 'assets/img/avatar-clinica.png';
          }
        });
        return res.result;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }




  //============================
  //  Agendamento
  //============================
  buscarAgendamentos(tutor_id){
    return this.api.get('api/v1/agendamento?where[tutor_id]='+tutor_id)
    .then((res: any) => {
        console.log("Aqui eh server provider - Agendamento " + res);
        console.log(res.result);
        res.result.map((agen : any) => {
          agen.data = moment(agen.data).format("DD/MM/YYYY");
        });
        return res.result;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarServicos(estabelecimento_id){
    
    return this.api.get('api/v1/servicos?where[estabelecimento_id]='+estabelecimento_id)
    .then((res: any) => {
        console.log("Aqui eh server provider - serviços " + res);
        console.log(res.result);
        return res.result;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarServicosPorId(servico_id){
    
    return this.api.get('api/v1/servicos/'+servico_id)
    .then((res: any) => {
        console.log("Aqui eh server provider - serviços " + res);
        console.log(res);
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  buscarEstabelecimentoPorId(estabelecimento_id){
    return this.api.get('api/v1/estabelecimentos/'+estabelecimento_id)
      .then((res: any) => {
        console.log("Aqui eh server provider - estabelecimento " + res);
        console.log(res);
        return res;
      })
      .catch((erro) => {
        console.log(erro);
      });
    
  }

  buscarHorarios(estabelecimento_id, data){
    
    return this.api.get('api/v1/estabelecimentos/'+estabelecimento_id+'/horarios-disponiveis/'+data)
    .then((res: any) => {
        console.log("Aqui eh server provider - horários " + res);
        console.log(res.horarios);
        return res.horarios;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }

  agendar(agendamento: any){
    if(agendamento.id){
      return this.api.put('api/v1/agendamento/'+agendamento.id, agendamento)
      .then((res: any) => {
          console.log("Agendamento editado com sucesso");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }else{
      return this.api.post('api/v1/agendamento', agendamento)
      .then((res: any) => {
          console.log("Agendamento realizado com sucesso");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }
  }

  deletarAgendamento(agendamento_id){
    try {
      return this.api.delete('api/v1/agendamento/'+agendamento_id);
    } catch (error) {
      console.log(error);
    }
  }


  //============================
  //  Medicamentos
  //============================
  async buscarMedicamentos(){
    return await this.api.get('api/v1/uso-medicamentos')
    .then((res: any) => {
      
      res.result.map(async (medicamento : any) => {
        medicamento.data_uso = moment(medicamento.data_uso).format("DD/MM/YYYY");
        let pet = await this.buscarPetPorId(medicamento.pet_id);
        medicamento.pet_nome = pet.nome;
        

      });

      console.log(res.result);
      console.log(this.usuario.id);

      let medicamentos = res.result.filter(async (medicamento : any) => {
        let pet = await this.buscarPetPorId(medicamento.pet_id);
        medicamento.pet_tutor_id = pet.tutor_id;
        console.log(medicamento.pet_tutor_id);
        console.log(this.usuario.id);
        return medicamento.pet_tutor_id === this.usuario.id;
      });

      // let medicamentos = res.result.forEach(medicamento => {
      //     if(medicamento.pet_tutor_id === this.usuario.id) {
      //       return medicamento;
      //     }
      // });

      console.log(res.result);
      

        return medicamentos;
      })
      .catch((erro) => {
      console.log(erro);
      return erro;
    });
  }

  salvarMedicamento(medicamento: any){
    if(medicamento.id){
      return this.api.put('api/v1/uso-medicamentos/'+medicamento.id, medicamento)
      .then((res: any) => {
          console.log("Medicamento editado com sucesso");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }else{
      return this.api.post('api/v1/uso-medicamentos', medicamento)
      .then((res: any) => {
          console.log("Medicamento cadastrado com sucesso");
          console.log(res);
          return res;
        })
        .catch((erro) => {
        console.log(erro);
        return erro;
      });
    }
    
  }
  
  deletarMedicamento(medicamento_id){
    return this.api.delete('api/v1/uso-medicamentos/'+medicamento_id)
    .then((res: any) => {
        return res;
    })
    .catch((erro) => {
      console.log(erro);
    });
  }



}
