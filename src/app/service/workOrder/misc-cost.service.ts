import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MiscCostService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'miscCost';
  }

  create(miscCost) {
    return this.postService(miscCost, '/save');
  }

  getAllMiscCost() {
    return this.getService('/all');
  }

  deletMiscCost(id) {
    return this.deleteService(id)
  }

  editMiscCost(item) {
    return this.putService(item, '/update')
  }

}
