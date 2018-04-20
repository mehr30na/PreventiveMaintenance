import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServiceBase2} from "../serivce-base2.service";

@Injectable()
export class AccountService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'account';
  }

  create(account) {
    return this.postService(account, '/save');
  }

  getAllAccount() {
    return this.getService('/all');
  }

  deletAccount(id) {
    return this.deleteService(id)
  }

  editAccount(item) {
    return this.putService(item, '/update')
  }

}
