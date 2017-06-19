import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class user {
 

  defaultUser: any = {
    "nome": "Júnior Germani",
    "profilePic": "assets/img/speakers/bear.jpg",
    "email": "jrgermani@gmail.com"
  };


  constructor(public http: Http) {
    let user = 
      {
        "nome": "Rafael Germani",
        "profilePic": "assets/img/speakers/bear.jpg",
        "email": "rafaelgermani@gmail.com"
      };
  }

}
