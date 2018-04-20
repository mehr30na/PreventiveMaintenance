import {Injectable} from '@angular/core';
import {Config} from "../../configuration/config";
import {Http, Headers} from "@angular/http";
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SignUpService extends ServiceBase2 {

  _url: string;

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'signUp';
    this._url = Config.getUrl();
  }

  signUp(user) {
    // return this.postService(userAccount, '');
    const json = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json');
    // return this.putService(userAccount, '/auth')
    return this._HttpClient.post(this._url + 'user/signup', json, {headers: headers});
  }

}
