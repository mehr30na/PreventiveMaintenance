import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WorkOrderStatusService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'workOrderStatus';
  }

  create(workOrderStatus) {
    return this.postService(workOrderStatus, '/save');
  }

  getAllWorkOrderStatus() {
    return this.getService('/all');
  }

  deletWorkOrderStatus(id) {
    return this.deleteService(id)
  }

  editWorkOrderStatus(item) {
    return this.putService(item, '/update')
  }

}
