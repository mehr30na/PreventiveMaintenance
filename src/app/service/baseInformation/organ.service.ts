import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrganService extends ServiceBase2 {


  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'organization';
  }

  create(organ) {
    return this.postService(organ, '/save');
  }

  getOrganById(id) {
    return this.getService('/' + id);
  }

  getAllOrgan() {
    return this.getService('/all');
  }

  deleteOrgan(id) {
    return this.deleteService(id)
  }

  editOrgan(city) {
    return this.putService(city, '/update')
  }

  getChild(id) {
    return this.getService('/children/' + id);
  }

  checkCode(code) {
    return this.getService('/checkCode/' + code);
  }

  getOrganByUserId(id) {
    return this.getService('/organbyuser/' + id);
  }

  // getCityByPId(pId){
  //     return this.getService('/province/'+pId)
  // }


}
