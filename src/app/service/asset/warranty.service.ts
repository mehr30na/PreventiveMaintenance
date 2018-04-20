import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServiceBase2} from "../serivce-base2.service";

@Injectable()
export class WarrantyService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'warranty';
  }

  create(warranty) {
    return this.postService(warranty, '/save');
  }

  getAllWarranty() {
    return this.getService('/all');
  }

  deleteWarranty(id) {
    return this.deleteService(id)
  }

  editWarranty(item) {
    return this.putService(item, '/update')
  }

}
