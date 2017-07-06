import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: Http, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {

    accountInfo =  {
           "grant_type": "password",
           "client_id": "1",
           "client_secret": "jYpTMjx5MMumELR0M9BaKbEvGz4ir8AvqD2jsE7x",
           "username": accountInfo.email,
           "password": accountInfo.password,
           "scope": ""
    };


    return this.api.post('oauth/token', accountInfo)
    .then((res: any) => {
        console.log("passou aqui");
        console.log(res);
        this._loggedIn(res.access_token);
      });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
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


  /**
   * Log the user out, which forgets the session
   */
  logout() {
    window.localStorage.removeItem('token');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(token) {
    window.localStorage.setItem('token', token);
  }
}
