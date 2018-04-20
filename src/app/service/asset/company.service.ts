import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CompanyService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'company';
  }

  create(company) {
    return this.postService(company, '/save');
  }

  getAllCompany() {
    return this.getService('/all');
  }

  deleteCompany(id) {
    return this.deleteService(id)
  }

  editCompany(item) {
    return this.putService(item, '/update')
  }

}
