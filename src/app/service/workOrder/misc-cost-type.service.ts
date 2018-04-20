import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MiscCostTypeService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'miscCostType';
  }

  create(miscCostType) {
    return this.postService(miscCostType, '/save');
  }

  getAllMiscCostType() {
    return this.getService('/all');
  }

  deletMiscCostType(id) {
    return this.deleteService(id)
  }

  editMiscCostType(item) {
    return this.putService(item, '/update')
  }

}
