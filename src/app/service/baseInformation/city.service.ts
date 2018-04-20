import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CityService extends ServiceBase2 {


  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'city';
  }

  create(city) {
    return this.postService(city, '/save');
  }

  getCityById(id) {
    return this.getService('/' + id);
  }

  getAllCity() {
    return this.getService('/all');
  }

  deleteCity(id) {
    return this.deleteService(id)
  }

  editCity(city) {
    return this.putService(city, '/update')
  }

  getOrganByPId(cId) {
    return this.getService('/organization/' + cId);
  }
}
