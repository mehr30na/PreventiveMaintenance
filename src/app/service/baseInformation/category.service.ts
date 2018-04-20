import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CategoryService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'category';
  }

  create(category) {
    return this.postService(category, '/save');
  }

  getCategoryById(id) {
    return this.getService('/' + id);
  }

  getAllCategory() {
    return this.getService('/all');
  }

  deleteCategory(id) {
    return this.deleteService(id)
  }

  editCategory(category) {
    return this.putService(category, '/update')
  }

  getChildrenById(id) {
    return this.getService('/children/' + id);
  }

  getChartItemPerCategory(id) {
    return this.getService('/count/' + id);
  }

}
