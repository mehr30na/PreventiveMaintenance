import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PropertyService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'property';
  }

  create(item) {
    return this.postService(item, '/save');
  }

  getAllProperty() {
    return this.getService('/all');
  }


}
