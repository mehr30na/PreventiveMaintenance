
import { Config } from './../../../configuration/config';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../../service/chat/chat.service";
import {Chat} from "../../../model/chat/chat";
import { Toolkit } from '../../../base/utility/toolkit';
import { Convert } from '../../../base/utility/convertDate/convert';
declare let $:any;

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  message = new Chat();
  ticketId: number;
  sent: boolean = false;
  delivered: boolean = false;
  int:any;

  constructor(private route: ActivatedRoute,
              private chatService: ChatService,
              ) {
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.ticketId = params['ticketId'];
      this.chatService.chatSignIn(this.ticketId,Config.getLocalStorageUser().id).subscribe((res: Chat[])=>{

        if(res)
        this.showMessages(res);
        let self = this;
        this.int = setInterval(function(){
          self.chatService.chatOnline(self.ticketId,Config.getLocalStorageUser().id).subscribe((res2:Chat[])=>{
            console.log(res2);
            if(res2)
            self.showMessages(res2);
          });
         }, 3000);
      });

    });
  }

  ngAfterViewInit() {

  }


  showMessages(res:Chat[]) {
    for (let item of res) {
      if (Config.getLocalStorageUser().id == item.fromId) {
        var g = new Date(item.date).toISOString();
        var h = new Date(item.date).getHours();
        var m = new Date(item.date).getMinutes();
        // console.log(d.substring(0,10));
        var j:string=Toolkit.changeGregorianToJalali(g.substring(0,10))
        // var date = y+'/'+m+'/'+d;
        var date = Toolkit.En2Fa(j.toString().substring(0,4))+'/'+
                   Toolkit.En2Fa(j.toString().substring(5,7))+'/'+
                   Toolkit.En2Fa(j.toString().substring(8,10))+'   '+
                   Toolkit.En2Fa(h.toString())+':'+
                   Toolkit.En2Fa(m.toString());
        // var date = j;
        this.drawMessage('right', item.text,item.id,date);
        this.sentMessage(item.id);
        if(item.seen){
          this.readMessage(item.id);
        }
      } else {
        this.drawMessage('left', item.text,item.id,date);
      }
    }
  }

  sendMessage() {

    this.message.from.id = Config.getLocalStorageUser().id;
    this.message.date = Date.now();
    this.message.ticket.id = this.ticketId;

    if (this.message.text != null) {
      this.chatService.create(this.message).subscribe((res: Chat) => {
  
        var g = new Date(res.date).toISOString();
        var h = new Date(res.date).getHours();
        var m = new Date(res.date).getMinutes();
        // console.log(d.substring(0,10));
        var j:string=Toolkit.changeGregorianToJalali(g.substring(0,10))
        // var date = y+'/'+m+'/'+d;
        var date = Toolkit.En2Fa(j.toString().substring(0,4))+'/'+
                   Toolkit.En2Fa(j.toString().substring(5,7))+'/'+
                   Toolkit.En2Fa(j.toString().substring(8,10))+'   '+
                   Toolkit.En2Fa(h.toString())+':'+
                   Toolkit.En2Fa(m.toString());
        this.drawMessage('right', res.text,res.id,date);
        this.sentMessage(res.id);
        this.message.text = null;

      }, err => {
        console.log('send faild');
      });
    }
  }


  drawMessage(side, text, id, date) {
    var $message;
    $message = $($('.message_template').clone().html());
    $('.message_template li').attr('id',id);
    $message.addClass(side).find('.text').html(text);
    $message.addClass(side).find('.date').html(date);
    // $message.addClass(side).find('.tik1').html('<p style="color: green">✓</p>');
    // $message.addClass(side).find('.tik2').html('<p style="color: green">✓</p>');
    $('.messages').append($message);
    setTimeout(function () {
      return $message.addClass('appeared');
    }, 0);
    var $messages = $('.messages');
    Config.alertAudio();
    return $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);

  }

  readMessage(id){
   $('li#'+id).find('.tik2').html('<p style="color: green">✓</p>');
  }
  sentMessage(id){
    $('li#'+id).find('.tik1').html('<p style="color: green">✓</p>');
  }


  ngOnDestroy() {
    clearInterval(this.int);
    this.chatService.chatSignOut(this.ticketId,Config.getLocalStorageUser().id).subscribe((res)=>{
      console.log(res);
    });
  }


}
