import {Injectable} from '@angular/core';
import {Config} from "../configuration/config";
import {ServiceBase} from "./service-base.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AttachmentService extends ServiceBase {

  base = 'upload';

  constructor(private http: HttpClient) {
    super();
  }

  uploadFile(formData, oId) {

    // console.log("service");
    // console.log(formData);
    let rnd = Math.random().toString(36).substring(7);


    return this.http.post(Config.getUrl() + this.base + '/' + oId + '?Authorization=' + Config.getLocalStorageToken()
      /*Config.getLocalStorageToken()*/, formData)


  }

  delete(attForDelet) {
    return this.http.put(Config.getUrl() + this.base + '?Authorization=' + Config.getLocalStorageToken()
      , attForDelet)


  }


}

/*

 */
