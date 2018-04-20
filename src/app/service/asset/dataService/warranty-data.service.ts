import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Metering} from "../../../model/asset/metering";
import {Warranty} from "../../../model/asset/warranty";

@Injectable()
export class WarrantyDataService {

  constructor() { }
  private warrantyOne = new BehaviorSubject<Warranty>(null);


  gettingWarrantyOne = this.warrantyOne.asObservable();

  setWarrantyOne(warrantyOne) {
    this.warrantyOne.next(warrantyOne)
  }

  private warrantyOneBOM = new BehaviorSubject<Warranty>(null);


  gettingWarrantyOneBOM = this.warrantyOneBOM.asObservable();

  setWarrantyOneBOM(warrantyOne) {
    this.warrantyOneBOM.next(warrantyOne)
  }
}
