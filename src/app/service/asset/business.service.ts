import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BusinessService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'business';
  }

  create(business) {
    return this.postService(business, '/save');
  }

  getAllBusiness() {
    return this.getService('/all');
  }

  deletBusiness(id) {
    return this.deleteService(id)
  }

  editBusiness(item) {
    return this.putService(item, '/update')
  }

}
