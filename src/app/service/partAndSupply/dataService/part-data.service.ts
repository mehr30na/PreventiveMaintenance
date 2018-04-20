import { Injectable } from '@angular/core';
import {Metering} from "../../../model/asset/metering";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Part} from "../../../model/asset/part";

@Injectable()
export class PartDataService {

  constructor() { }
  private partOne = new BehaviorSubject<Part>(null);


  gettingPartOne = this.partOne.asObservable();

  setPartOne(partOne) {
    this.partOne.next(partOne)
  }

  private partOneWO = new BehaviorSubject<Part>(null);


  gettingPartOneWO = this.partOneWO.asObservable();

  setPartOneWO(partOneWO) {
    this.partOneWO.next(partOneWO)
  }
}
