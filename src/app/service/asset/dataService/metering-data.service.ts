import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Province} from "../../../model/baseInformation/province";
import {Metering} from "../../../model/asset/metering";

@Injectable()
export class MeteringDataService {

  constructor() { }
  private meteringOne = new BehaviorSubject<Metering>(null);


  gettingMeteringOne = this.meteringOne.asObservable();

  setMeteringOne(meteringOne) {
    this.meteringOne.next(meteringOne)
  }

  private meteringOneBOM = new BehaviorSubject<Metering>(null);


  gettingMeteringOneBOM = this.meteringOneBOM.asObservable();

  setMeteringOneBOM(meteringOne) {
    this.meteringOneBOM.next(meteringOne)
  }
  private meteringOneWO = new BehaviorSubject<Metering>(null);


  gettingMeteringOneWO = this.meteringOneWO.asObservable();

  setMeteringOneWO(meteringOne) {
    this.meteringOneWO.next(meteringOne)
  }

}
