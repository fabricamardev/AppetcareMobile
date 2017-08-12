import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class Items {

  items: any = [];

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {

    return this.api.get('api/v1/pets', params)
    .then((res: any) => {
        console.log(res);
        this.items = res;
        return this.items;
    });

    // return this.api.get('/items', params)
    //   .map(resp => resp.json());
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
