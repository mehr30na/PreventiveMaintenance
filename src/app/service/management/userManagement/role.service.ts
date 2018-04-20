import {Injectable} from '@angular/core';
import {ServiceBase2} from "../../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RoleService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'userType';
  }

  create(role) {
    return this.postService(role, '/save');
  }

  getRoleById(roleId) {
    return this.getService('/' + roleId);
  }

  getAllRole() {
    return this.getService('/all');
  }

  deleteRole(id) {
    return this.deleteService(id)
  }

  editRole(role) {
    return this.putService(role, '/update')
  }
}
