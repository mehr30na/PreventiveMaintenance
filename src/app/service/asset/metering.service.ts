import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MeteringService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'metering';
  }

  create(metering) {
    return this.postService(metering, '/save');
  }

  getAllMetering() {
    return this.getService('/all');
  }

  deleteMetering(id) {
    return this.deleteService(id)
  }

  editMetering(item) {
    return this.putService(item, '/update')
  }


}
