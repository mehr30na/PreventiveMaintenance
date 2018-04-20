import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProvinceService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'province';
  }

  create(province) {
    return this.postService(province, '/save');
  }

  getProvinceById(id) {
    return this.getService('/' + id);
  }

  getAllProvince() {
    return this.getService('/all');
  }

  deleteProvince(id) {
    return this.deleteService(id)
  }

  editProvince(province) {
    return this.putService(province, '/update')
  }

  getCityByPId(pId) {
    return this.getService('/city/' + pId);
  }

  getProvinceByOrganId(id) {
    return this.getService('/organ/' + id);
  }

}
