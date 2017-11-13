import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://104.155.173.20/appetcare';
  // url: string = 'http://10.10.50.58/appetcare';

  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    // coloca o header do autenticado na request
    options.headers = this._userHeaders();


    return new Promise((resolve, reject) => {
        this.http.get(this.url + '/' + endpoint, options).map(
          (res) => res.json()).subscribe(data => {
            resolve(data);
        }, 
          (err) => {
          reject(err);
        });
    });



  }


  post(endpoint: string, body: any, options?: RequestOptions) {
    
    if (!options) {
      options = new RequestOptions();
    }
    // coloca o header do autenticado na request
    options.headers = this._userHeaders();

    return new Promise((resolve, reject) => {
        this.http.post(this.url + '/' + endpoint, body, options).map(
          (res) => res.json()).subscribe(data => {
            resolve(data);
        }, 
          (err) => {
          reject(err);
        });
    });
    // return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }
    // coloca o header do autenticado na request
    options.headers = this._userHeaders();

    return new Promise((resolve, reject) => {
        this.http.put(this.url + '/' + endpoint, body, options).map(
          (res) => res.json()).subscribe(data => {
            resolve(data);
        }, 
          (err) => {
          reject(err);
        });
    });
    // return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }
    // coloca o header do autenticado na request
    options.headers = this._userHeaders();

    return new Promise((resolve, reject) => {
      this.http.delete(this.url + '/' + endpoint, options).map(
        (res) => res.json()).subscribe(data => {
          resolve(data);
      }, 
        (err) => {
        reject(err);
      });
    });
    
    // return this.http.delete(this.url + '/' + endpoint, options);
  }





  //aqui pegamos o token e colocamos no formato q a api espera receber
  _userHeaders() {

    let token = 'Bearer ' + window.localStorage.getItem('token');

    if (!token) { return null; }

    let h = new Headers();
    h.append('Authorization', token);
    return h;
  }


  // por hora esse metodos não serão usados 
  

  

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
