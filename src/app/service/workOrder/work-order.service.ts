import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class WorkOrderService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'workOrder';
  }

  create(workOrder) {
    return this.postService(workOrder, '/save');
  }

  getAllWorkOrder() {
    return this.getService('/all');
  }

  getAllWorkOrderTreeNode() {
    return this.getService('/all/treenode');
  }

  deletWorkOrder(id) {
    return this.deleteService(id)
  }

  editWorkOrder(item) {
    return this.putService(item, '/update')
  }

}
