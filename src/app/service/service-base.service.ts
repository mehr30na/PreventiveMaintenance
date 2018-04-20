// import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import {Headers, Http, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../../app/configuration/config';
import {Observable} from 'rxjs/Observable';

// @Injectable()
export class ServiceBase {
    public url: string;
    public _prefix: string;
    public _objectName: string;
    public _HttpClient: HttpClient;
    // public http:Http;
  
    constructor() {
        this.url = Config.getUrl();
        this._prefix = '';
    }

    getService(_objectsuffix: string) {
      let headers = new HttpHeaders();
      
    
    //   headers=  headers.append('Authrization', Config.getLocalStorageToken());
    //   console.log(headers.getAll('Authrization'))
      return this._HttpClient.get(
            this.url + this._prefix + this._objectName  + _objectsuffix+'?authorization='+Config.getLocalStorageToken());
    }

    postService(value: any, _objectsuffix: string) {
        let headers = new HttpHeaders();
      headers = headers
        .set('Content-Type', 'application/json')
        .set('Authorization', Config.getLocalStorageToken());
        return this._HttpClient.post(this.url + this._prefix + this._objectName +
            _objectsuffix+'?authorization='+Config.getLocalStorageToken(), JSON.stringify(value), {headers: headers});
    }


    putService(value: any, _objectsuffix: string) {
        const headers = new HttpHeaders(
          {'Content-Type': 'application/json',
                   'Authorization': Config.getLocalStorageToken()}
          );
        return this._HttpClient.put(this.url + this._prefix + this._objectName + 
      _objectsuffix
          + '?authorization=' + Config.getLocalStorageToken()
          , JSON.stringify(value), {headers: headers});
    }

    deleteService(id: string) {
      let headers = new HttpHeaders();
    //   headers = headers.set('Authorization', Config.getLocalStorageToken());
        return this._HttpClient.delete(this.url + this._prefix + this._objectName + '/' + (id)+'?authorization='+Config.getLocalStorageToken()
        , {headers: headers});
    }


}

