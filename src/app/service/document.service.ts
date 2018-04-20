import { Injectable } from '@angular/core';
import {ServiceBase2} from "./serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DocumentService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'document';
  }

  getDocumentById(id) {
    return this.getService('/' + id);
  }


}
