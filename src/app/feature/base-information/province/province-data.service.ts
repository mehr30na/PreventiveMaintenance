import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Province} from "../../../model/baseInformation/province";

@Injectable()
export class ProvinceDataService {

  constructor() {
  }

  private provinceOne = new BehaviorSubject<Province>(null);


  gettingProvinceOne = this.provinceOne.asObservable();

  setProvinceOne(provinceOne) {
    this.provinceOne.next(provinceOne)
  }
}
