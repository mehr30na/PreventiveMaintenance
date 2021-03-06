import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PurchaseService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'purchase';
  }

  create(purchase) {
    return this.postService(purchase, '/save');
  }

  getAllPurchase() {
    return this.getService('/all');
  }

  deletePurchase(id) {
    return this.deleteService(id)
  }

  editPurchase(item) {
    return this.putService(item, '/update')
  }

}
