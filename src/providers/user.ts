import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class User {
  _user: any;

  constructor(public http: Http, public api: Api) {
  }

  
  login(accountInfo: any) {

    accountInfo =  {
           "grant_type": "password",
           "client_id": "1",
           "client_secret": "44G81LKsCpwTllD3BIxXXuOpQtcVpj4giQ0y8aFX",
           "username": accountInfo.email,
           "password": accountInfo.password,
           "scope": ""
    };


    return this.api.post('oauth/token', accountInfo)
    .then((res: any) => {
      this._loggedIn(res.access_token);
      return this.buscarTutor(accountInfo.username);
      });
  }



  buscarTutor(email) {

    return this.api.get('api/v1/tutores?where[email]='+email)
    .then((res: any) => {
      console.log("Dados do tutor");
      console.log(res.result[0]);
      let usuario = res.result[0];
      if(!usuario.image){
        usuario.image = 'assets/img/avatar.png';
      }
      window.localStorage.setItem('usuario', JSON.stringify(usuario));
    });
  }


  signup(accountInfo: any) {

    let senha = accountInfo.password;
    delete accountInfo.password;

    return this.api.post('api/tutores', accountInfo)
      .then((res: any) => {
          let dados: any = {};
          console.log(res);
          dados.name = res.nome;
          dados.email = res.email;
          dados.tutor_id = res.id
          dados.password = senha;
          return dados;
      })
      .then(dados => {
        return this.api.post('api/users', dados);
      })
      .then((user: any ) => {
        return this.login({email: user.email, password: senha});
      });
  }


  logout() {
    window.localStorage.removeItem('token');
  }


  _loggedIn(token) {
    window.localStorage.setItem('token', token);
  }
}
