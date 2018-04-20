import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServiceBase2} from "../../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CollectorService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'collector';
  }

  create(collector) {
    return this.postService(collector, '/save');
  }

  getCollectorById(id) {
    return this.getService('/' + id);
  }

  getAllCollector() {
    return this.getService('/all');
  }

  deleteCollector(id) {
    return this.deleteService(id)
  }

  editCollector(collector) {
    return this.putService(collector, '/update')
  }

  getCollectorBySId(sId) {
    return this.getService('/' + sId);
  }
}
