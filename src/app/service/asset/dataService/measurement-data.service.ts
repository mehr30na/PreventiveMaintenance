import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Metering} from "../../../model/asset/metering";
import {UnitOfMeasurement} from "../../../model/baseInformation/unitOfMeasurement";

@Injectable()
export class MeasurementDataService {

  constructor() { }
  private measurementOne = new BehaviorSubject<UnitOfMeasurement>(null);


  gettingMeasurementOne = this.measurementOne.asObservable();

  setMeasurementOne(measurementOne) {
    this.measurementOne.next(measurementOne)
  }
}
