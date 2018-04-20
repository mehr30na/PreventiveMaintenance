import { Ticket } from './../../model/ticket/ticket';
import {Injectable} from '@angular/core';
import {ServiceBase2} from "../serivce-base2.service";
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TicketService extends ServiceBase2 {


  constructor(public _HttpClient: HttpClient) {
    super();
    this._objectName = 'ticket';
  }

  create(ticket) {
    return this.postService(ticket, '/save');
  }

  getTicketById(id) {
    return this.getService('/' + id);
  }

  getAllTicket() {
    return this.getService('/all');
  }

  deleteTicket(id) {
    return this.deleteService(id)
  }

  editTicket(city) {
    return this.putService(city, '/update')
  }

  getTicketByItemId(id) {
    return this.getService('/item/'+id);
  }

  allocateTicket2Expert(ticketId,expertList){
    return this.postService(expertList,'/assignexpert/'+ticketId);
  }

  getExpertTickets(expertId){
    return this.getService('/expert/'+expertId);
  }
  setTicketStatus(ticket,status,TicketId){
    return this.putService(ticket, '/status/'+status+'/'+TicketId)
  }
  getExpertTicketsStatus(status,expertId){
    return this.getService('/status/'+status+'/'+expertId);
  }
  getChartTicketPerCategory() {
    return this.getService('/count/categoryticket');
  }
  getChartTicketPerOrganization() {
    return this.getService('/count/organticket');
  }


  // getOrganByPId(cId){
  //   return this.getService('/organization/'+cId);
  // }
}
