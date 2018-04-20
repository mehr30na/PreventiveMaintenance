import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChargeDepartmentService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'chargeDepartment';
  }

  create(chargeDepartment) {
    return this.postService(chargeDepartment, '/save');
  }

  getAllChargeDepartment() {
    return this.getService('/all');
  }

  deleteChargeDepartment(id) {
    return this.deleteService(id)
  }

  editChargeDepartment(item) {
    return this.putService(item, '/update')
  }

}
