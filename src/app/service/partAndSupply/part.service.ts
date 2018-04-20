import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PartService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'part';
  }

  create(part) {
    return this.postService(part, '/save');
  }

  getAllPart() {
    return this.getService('/all');
  }

  getAllPartTreeNode(){
    return this.getService('/all/treenode');
  }

  deletPart(id) {
    return this.deleteService(id)
  }

  editPart(item) {
    return this.putService(item, '/update')
  }

}
