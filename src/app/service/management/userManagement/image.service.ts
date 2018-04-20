import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Config} from "../../../configuration/config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ImageService {

  _url: string;

  constructor(public _HttpClient: HttpClient) {
    this._url = Config.getUrl();
  }

  getImage(id) {


    return this._HttpClient.get(this._url + 'user/download/' + id + '?Authorization=' + Config.getLocalStorageToken())
      ;
  }


  // delete(collegeId) {
  //   return this.deleteService(collegeId);
  // }


}
