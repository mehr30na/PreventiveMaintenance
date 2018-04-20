import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class NetService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'net';
  }

  create(item) {
    return this.postService(item, '/save');
  }

  getNetById(id) {
    return this.getService('/' + id);
  }

  getAllNet() {
    return this.getService('/all');
  }

  deleteNet(id) {
    return this.deleteService(id)
  }

  editNet(item) {
    return this.putService(item, '/update')
  }

  getNetListByTicketId(id) {
    return this.getService('/' + id);
  }
  getNetListByUserId(id) {
    return this.getService('/' + id);
  }
  getChartNetPerOrganization() {
    return this.getService('/count/organticket');
  }
  getChartNetPerExpert() {
    return this.getService('/count/netexperts');
  }
}
