import {Injectable} from '@angular/core';
import {ServiceBase2} from "../../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SparePartService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'sparePart';
  }

  create(sparePart) {
    return this.postService(sparePart, '/save');
  }

  getSparePartById(id) {
    return this.getService('/' + id);
  }

  getAllSparePart() {
    return this.getService('/all');
  }

  deleteSparePart(id) {
    return this.deleteService(id)
  }

  editSparePart(sparePart) {
    return this.putService(sparePart, '/update')
  }


  getAllNewSparePart() {
    return this.getService('/new/all');
  }

  getNewSparePartById(id) {
    return this.getService('/new/' + id);
  }

}
