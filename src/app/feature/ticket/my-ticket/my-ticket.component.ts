import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../service/chat/ticket.service";
import {Config} from "../../../configuration/config";
import {Ticket} from "../../../model/ticket/ticket";
import {ToastrService} from "ngx-toastr";
import { isNullOrUndefined } from 'util';
import { Image } from '../../../model/Image';
import { Item } from '../../../model/item/item';

@Component({
  selector: 'my-ticket',
  templateUrl: './my-ticket.component.html',
  styleUrls: ['./my-ticket.component.scss']
})
export class MyTicketComponent implements OnInit {
  dragEnabled = true;
  todoTicket: Array<Ticket> = [];
  doingTicket: Array<Ticket> = [];
  testTicket: Array<Ticket> = [];
  doneTicket: Array<Ticket> = [];
  myConfig = Config;

  constructor(private ticketService: TicketService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.ticketService.getExpertTicketsStatus('TODO', Config.getLocalStorageUser().id).subscribe((res: Ticket[]) => {
      if (res) {
        for(let item of res){
          if(item.item==null){
            item.item=new Item()
          }
          if(item.item.image==null){
            item.item.image=new Image()
          }
        }
        this.todoTicket=res
      }
    });
    this.ticketService.getExpertTicketsStatus('DOING', Config.getLocalStorageUser().id).subscribe((res: Ticket[]) => {
      if (res) {
        for(let item of res){
          if(item.item==null){
            item.item=new Item()
          }
          if(item.item.image==null){
            item.item.image=new Image()
          }
        }
        this.doingTicket=res
      }
    });
    this.ticketService.getExpertTicketsStatus('TESTING', Config.getLocalStorageUser().id).subscribe((res: Ticket[]) => {
      if (res) {
        for(let item of res){
          if(item.item==null){
            item.item=new Item()
          }
          if(item.item.image==null){
            item.item.image=new Image()
          }
        }
        this.testTicket=res
      }
    });
    this.ticketService.getExpertTicketsStatus('DONE', Config.getLocalStorageUser().id).subscribe((res: Ticket[]) => {
      if (res) {
        for(let item of res){
          if(item.item==null){
            item.item=new Item()
          }
          if(item.item.image==null){
            item.item.image=new Image()
          }
        }
        this.doneTicket=res
      }
    });


  }

  onTodoDrop(e: any) {
    console.log(e);
    this.ticketService.setTicketStatus(e.dragData, 'TODO', e.dragData.id).subscribe(res => {
      if (res) {
        if (e.dragData.ticketStatus === 'DOING') {
          this.removeItem(e.dragData, this.doingTicket);
        } else if (e.dragData.ticketStatus === 'TESTING') {
          this.removeItem(e.dragData, this.testTicket);
        }
        e.dragData.ticketStatus='TODO';
        this.todoTicket.push(e.dragData);
        this.toastr.success('این درخواست با موفقیت به لیست درخواست ها افزوده شد!', 'موفق');

      } else {
        this.toastr.warning('تغییر وضعیت درخواست درحال حاضر انجام پذیر نمی باشد', 'هشدار');
      }
    })

  }
  // onFruitDrop(e: any) {
  //   this.droppedFruits.push(e.dragData);
  //   this.removeItem(e.dragData, this.fruits);
  // }

  onDoingDrop(e: any) {
    console.log(e);
    this.ticketService.setTicketStatus(e.dragData, 'DOING', e.dragData.id).subscribe(res => {
      if (res) {
        if (e.dragData.ticketStatus === 'TODO') {
          this.removeItem(e.dragData, this.todoTicket);
        } else if (e.dragData.ticketStatus === 'TESTING') {
          this.removeItem(e.dragData, this.testTicket);
        }
        e.dragData.ticketStatus='DOING';
        this.doingTicket.push(e.dragData);
        this.toastr.success('این درخواست با موفقیت به لیست درخواست های در مرحله انجام افزوده شد!', 'موفق');

      } else {
        this.toastr.warning('تغییر وضعیت درخواست درحال حاضر انجام پذیر نمی باشد', 'هشدار');
      }
    })

  }

  onTestDrop(e: any) {
    this.ticketService.setTicketStatus(e.dragData, 'TESTING', e.dragData.id).subscribe(res => {
      if (res) {
        if (e.dragData.ticketStatus === 'DOING') {
          this.removeItem(e.dragData, this.doingTicket);
        } else if (e.dragData.ticketStatus === 'TODO') {
          this.removeItem(e.dragData, this.todoTicket);
        }
        e.dragData.ticketStatus='TESTING';
        this.testTicket.push(e.dragData);
        this.toastr.success('این درخواست با موفقیت به لیست درخواست های در مرحله تست افزوده شد!', 'موفق');
      } else {
        this.toastr.warning('تغییر وضعیت درخواست درحال حاضر انجام پذیر نمی باشد', 'هشدار');
      }
    })
  }

  onDoneDrop(e: any) {
    this.ticketService.setTicketStatus(e.dragData, 'DONE', e.dragData.id).subscribe(res => {
      if (res) {
        e.dragData.ticketStatus='DONE';
        this.doneTicket.push(e.dragData);
        this.toastr.success('این درخواست با موفقیت به لیست درخواست های در مرحله انجام شده افزوده شد!', 'موفق');
        this.removeItem(e.dragData, this.testTicket);
      } else {
        this.toastr.warning('تغییر وضعیت درخواست درحال حاضر انجام پذیر نمی باشد', 'هشدار');
      }
    })
  }

  // onAnyDrop(e: any) {
  //   this.droppedItems.push(e.dragData);
  //   if (e.dragData.type === 'vegetable') {
  //     this.removeItem(e.dragData, this.vegetables);
  //   } else {
  //     this.removeItem(e.dragData, this.fruits);
  //   }
  // }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.title
    }).indexOf(item.title);
    list.splice(index, 1);
  }

}
