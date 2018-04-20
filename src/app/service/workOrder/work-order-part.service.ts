import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WorkOrderPartService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'workOrderPart';
  }

  create(workOrderPart) {
    return this.postService(workOrderPart, '/save');
  }

  getAllWorkOrderPart() {
    return this.getService('/all');
  }

  deletWorkOrderPart(id) {
    return this.deleteService(id)
  }

  editWorkOrderPart(item) {
    return this.putService(item, '/update')
  }
}
