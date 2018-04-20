import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Warranty} from "../../../model/asset/warranty";
import {Purchase} from "../../../model/asset/purchase";

@Injectable()
export class PurchaseDataService {

  constructor() { }

  private purchaseOne = new BehaviorSubject<Purchase>(null);


  gettingPurchaseOne = this.purchaseOne.asObservable();

  setPurchaseOne(purchaseOne) {
    this.purchaseOne.next(purchaseOne)
  }
}
