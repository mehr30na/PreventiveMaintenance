import { Ticket } from './../../model/ticket/ticket';
import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ServiceBase2} from "../serivce-base2.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ChatService extends ServiceBase2 {

  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'chat';
  }

  create(item) {
    return this.postService(item, '/save');
  }

  sendToken(token, id) {
    return this.getService('/user/fcmtoken/' + token + '/' + id);
  }

  getAllItem(ticketId) {
    return this.getService('/all/' + ticketId);
  }

  chatSignIn(ticketId,userId){
    return this.getService('/signin/'+ticketId+'/'+userId);
  }

  chatOnline(ticketId,userId){
    return this.getService('/online/'+ticketId+'/'+userId);
  }


  chatSignOut(ticketId,userId){
    return this.getService('/logout/'+ticketId+'/'+userId);
  }



}
