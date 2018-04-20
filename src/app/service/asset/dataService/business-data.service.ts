import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {UnitOfMeasurement} from "../../../model/baseInformation/unitOfMeasurement";
import {Business} from "../../../model/asset/business";

@Injectable()
export class BusinessDataService {

  constructor() { }
  private businessOne = new BehaviorSubject<Business>(null);


  gettingBusinessOne = this.businessOne.asObservable();

  setBusinessOne(businessOne) {
    this.businessOne.next(businessOne)
  }
}
