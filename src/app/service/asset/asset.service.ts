import { Injectable } from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AssetService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'asset';
  }

  create(asset) {
    return this.postService(asset, '/save');
  }

  getAllAsset() {
    return this.getService('/all');
  }
  getOneById(id){
    return this.getService('/'+id);
  }
  getAllAssetByCId(id) {
    return this.getService('/category/'+id);
  }

  getAllAssetTreeNode() {
    return this.getService('/all/treenode');
  }

  deletAsset(id) {
    return this.deleteService(id)
  }

  editAsset(item) {
    return this.putService(item, '/update')
  }


}
