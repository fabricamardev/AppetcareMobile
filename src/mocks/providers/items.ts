import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let items = [
      {
        "nome": "Urso da Montanha",
        "profilePic": "assets/img/speakers/bear.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Donald Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Ellie Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Molly Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      },
      {
        "nome": "Paul Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "dt_nascimento": "21/11/2010",
        "sexo": "Macho",
        "especie": "U. arctos",
        "raca": "Urso Pardo"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  edit(item: Item) {
    return this.items.filter((item) => {
      return item;
    });
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
