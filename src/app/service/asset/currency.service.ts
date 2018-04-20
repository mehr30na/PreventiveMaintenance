import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CurrencyService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'currency';
  }

  create(currency) {
    return this.postService(currency, '/save');
  }

  getAllCurrency() {
    return this.getService('/all');
  }

  deletCurrency(id) {
    return this.deleteService(id)
  }

  editCurrency(item) {
    return this.putService(item, '/update')
  }


}
