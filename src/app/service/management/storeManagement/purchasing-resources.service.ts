import {Injectable} from '@angular/core';
import {ServiceBase2} from "../../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PurchasingResourcesService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'purchasingres';
  }

  create(purchasingResources) {
    return this.postService(purchasingResources, '/save');
  }

  getPurchasingResourcesById(id) {
    return this.getService('/' + id);
  }

  getAllPurchasingResources() {
    return this.getService('/all');
  }

  deletePurchasingResources(id) {
    return this.deleteService(id)
  }

  editPurchasingResources(purchasingResources) {
    return this.putService(purchasingResources, '/update')
  }

  getPurchasingResourceBySId(sId) {
    return this.getService('/' + sId);
  }
}
