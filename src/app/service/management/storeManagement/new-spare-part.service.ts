import {Injectable} from '@angular/core';
import {ServiceBase2} from "../../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class NewSparePartService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'newSparePart';
  }

  getNewSparePartById(id) {
    return this.getService('/' + id);
  }

  getAllNewSparePart() {
    return this.getService('/all');
  }

}

