import { User } from './../../../model/management/userManagement/user';
import {Config} from './../../../configuration/config';
import {UserService} from './../../../service/management/userManagement/user.service';
import {Organization} from './../../../model/baseInformation/organization';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Item} from "../../../model/item/item";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../../service/chat/ticket.service";
import {Router} from "@angular/router";
import {Ticket} from "../../../model/ticket/ticket";
import {Swal} from "../../../base/utility/swal";
import swal from 'sweetalert2'
import {ItemService} from "../../../service/item/item.service";
import {ToastrService} from "ngx-toastr";
import {Toolkit} from "../../../base/utility/toolkit";

declare let $: any;

@Component({
  selector: 'expert-allocate',
  templateUrl: './expert-allocate.component.html',
  styleUrls: ['./expert-allocate.component.scss']
})
export class ExpertAllocateComponent implements OnInit {

  expertList: User[];
  ticket: Ticket = new Ticket();
  expertId:number;
  ticketEdit: Ticket = new Ticket();
  ticketList: Array<Ticket> = [];
  mode: string = '';
  itemList: Array<Item> = [];
  cId: number;
  organId: number;

  saveButton: boolean;
  saveButton2: boolean;
  editForm: FormGroup;
  addForm: FormGroup;
  expertListSelect:Array<number>=[]

  myConfig=Config;
  
  constructor(private ticketService: TicketService,
              private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private itemService: ItemService) {
    this.addForm = fb.group({
      itemAdd: new FormControl(null, [Validators.required]),
      ticketAdd: new FormControl(null, [Validators.required]),
      expertAdd: new FormControl(null, [Validators.required]),
    });
    this.editForm = fb.group({
      itemEdit: new FormControl(null, [Validators.required]),
      titleEdit: new FormControl(null, [Validators.required]),
      descEdit: new FormControl(null, [Validators.required]),
    });
  }

  add() {
    this.mode = 'add';
    this.ngAfterViewInit();
  }

  cancel() {
    this.router.navigateByUrl('/ticket/addTicket')
  }

  ngAfterViewInit() {
    let self = this;

    $(document).ready(function () {
      $('.itemSelect').select2({
        placeholder: 'کالا'
      }).on('change', (e) => {
        self.getTicketByItemId($(e.currentTarget).val())
      });
    });

    $(document).ready(function () {
      $('.itemAdd').select2({
        placeholder: 'کالا'
      }).on('change', (e) => {
        self.getTicketByItemId($(e.currentTarget).val());
        self.ticket.item.id = ($(e.currentTarget).val());
        console.log(self.ticket);
      });
    });
    $(document).ready(function () {
      $('.ticketAdd').select2({
        placeholder: 'درخواست'
      }).on('change', (e) => {
        self.ticket.id = ($(e.currentTarget).val());
        console.log(self.ticket);
      });
    });
    // $(document).ready(function () {
    //   $('.expertAdd').select2({
    //     placeholder: 'کارشناس'
    //   }).on('change', (e) => {
    //     self.expertId = $(e.currentTarget).val();
    //     console.log(self.ticket);
    //   });
    // });
    $(document).ready(function () {
      $('.expertAdd').select2({
        placeholder: 'کارشناس'
      }).on('change', (e) => {
        self.expertListSelect =
          Toolkit.changeSelectedListExpert(
            self.expertList,
            self.expertListSelect,
            $(e.currentTarget).val()
          );
      });
    });
  }


  getTicketByItemId(id) {
    this.ticketService.getTicketByItemId(id).subscribe((res: Ticket[]) => {
      if(res){
        this.ticketList = res;
        this.ticket.id = res[0].id;
        console.log(res[0]);
      }
     
    })
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.ngAfterViewInit()
      this.userService.getAllExpert(Config.getLocalStorageUser().organization.id).subscribe((res: User[]) => {
        if(res){
          this.expertList = res;
          this.expertId = res[0].id;
        }
      });

      this.itemService.getAllItem().subscribe((res: Item[]) => {
        if (res) {
          this.itemList = res;
          this.ticket.item.id = res[0].id;
          // console.log(this.ticket);
          this.ticketService.getTicketByItemId(this.ticket.item.id).subscribe((res: Ticket[]) => {
            if (res) {
              this.ticketList = res;
              console.log(res);
            } else {
              this.toastr.warning('درخواستی ثبت نشده!','هشدار')
              // this.router.navigateByUrl('/baseInformation/listProvince')
              // this.mode='add'
              // this.router.navigateByUrl('/baseInformation/listProvince')
            }
          })
        } else {
          this.toastr.warning('کالایی ثبت نشده!','هشدار')
          this.router.navigateByUrl('/item/addItem')
        }
      })
    }
  }

 allocateExpert(){
   this.ticketService.allocateTicket2Expert(this.ticket.id,this.expertListSelect).subscribe(res=>{
    //  alert(res);
     this.toastr.success('تیکت با موفقیت به کارشناس های مربوطه اختصاص یافت','موفق')
    this.mode='';
   },err=>{
     alert(err);
   });
 }
  editTicket(id) {
    // this.mode = 'edit';
    // this.ngAfterViewInit()
    // // this.userId = id;
    // this.ticketService.getTicketById(id).subscribe((res: Ticket) => {
    //   if (res != null) {
    //     this.ticketEdit = res;
    //     this.ticketEdit.item.id = res.item.id;
    //
    //   }
    // })
  }


}
