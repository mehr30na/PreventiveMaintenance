import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ItemService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'item';
  }

  create(item) {
    return this.postService(item, '/save');
  }

  getItemById(id) {
    return this.getService('/' + id);
  }

  getAllItem() {
    return this.getService('/all');
  }

  deleteItem(id) {
    return this.deleteService(id)
  }

  editItem(item) {
    return this.putService(item, '/update')
  }

  getChildrenById(id) {
    return this.getService('/children/' + id);
  }

  getItemByParentId(id) {
    return this.getService('/' + id + '/parent');
  }

  getItemByCategoryId(id) {
    return this.getService('/' + id + '/category');
  }

}
