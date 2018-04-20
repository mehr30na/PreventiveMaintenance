import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Warranty} from "../../../model/asset/warranty";
import {Company} from "../../../model/asset/company";

@Injectable()
export class CompanyDataService {

  constructor() { }
  private companyOne = new BehaviorSubject<Company>(null);


  gettingCompanyOne = this.companyOne.asObservable();

  setCompanyOne(companyOne) {
    this.companyOne.next(companyOne)
  }

}
