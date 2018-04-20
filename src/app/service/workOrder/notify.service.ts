import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class NotifyService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'notify';
  }

  create(notify) {
    return this.postService(notify, '/save');
  }

  getAllNotify() {
    return this.getService('/all');
  }

  deletNotify(id) {
    return this.deleteService(id)
  }

  editNotify(item) {
    return this.putService(item, '/update')
  }

}
