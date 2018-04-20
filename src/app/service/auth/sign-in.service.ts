import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Config} from "../../configuration/config";
import {Http, Headers} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SignInService extends ServiceBase2 {
  _url: string;

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'auth';
    this._url = Config.getUrl();
  }

  signIn(user) {
    // return this.postService(userAccount, '');
    const json = JSON.stringify(user);
    let headers = new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json');
    return this._HttpClient.post(this._url + 'user/signin', json, {headers: headers}).map(res=>res)

  }
}
