import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class MeasurementService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'unitofmeasurement';
  }

  create(measurement) {
    return this.postService(measurement, '/save');
  }

  getMeasurementById(id) {
    return this.getService('/' + id);
  }

  getAllMeasurement() {
    return this.getService('/all');
  }

  deleteMeasurement(id) {
    return this.deleteService(id)
  }

  editMeasurement(measurement) {
    return this.putService(measurement, '/update')
  }
}
