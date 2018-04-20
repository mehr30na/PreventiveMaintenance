import { Config } from './../../../configuration/config';
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

declare let $: any;

@Component({
  selector: 'add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit, AfterViewInit {
  ticket: Ticket = new Ticket();
  ticketEdit: Ticket = new Ticket();
  ticketList: Array<Ticket> = [];
  mode: string = '';
  itemList: Array<Item> = [];
  cId: number;


  saveButton: boolean;
  saveButton2: boolean;
  editForm: FormGroup;
  addForm: FormGroup;

  myConfig=Config;
  constructor(private ticketService: TicketService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private itemService: ItemService) {
    this.addForm = fb.group({
      itemAdd: new FormControl(null, [Validators.required]),
      titleAdd: new FormControl(null, [Validators.required]),
      descAdd: new FormControl(null, [Validators.required]),
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
  goToAllocate(){
    this.router.navigateByUrl('/ticket/expert-allocate')
    // this.ngAfterViewInit()
  }

  cancel() {
    this.mode = '';
    this.ngAfterViewInit();
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
        self.ticket.item.id = ($(e.currentTarget).val());
      });
    });
    $(document).ready(function () {
      $('.itemEdit').select2({
        placeholder: 'کالا'
      }).on('change', (e) => {
        self.ticketEdit.item.id = ($(e.currentTarget).val());
      });
    });
  }

  getTicketByItemId(id) {
    this.ticketService.getTicketByItemId(id).subscribe((res: Ticket[]) => {
      this.ticketList = res;
      console.log(1,res)
    })
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.itemService.getAllItem().subscribe((res: Item[]) => {
        if (res) {
          this.itemList = res;
          // console.log(res)
          // alert(JSON.stringify(res))
          this.ticket.item.id = this.itemList[0].id;
          this.ticketService.getTicketByItemId(this.ticket.item.id).subscribe((res: Ticket[]) => {
            if (res) {
              this.ticketList = res;
              console.log(121232145345354,res);
            } else {
              this.toastr.warning('درخواستی ثبت نشده!','هشدار')
              // this.mode='add'
              // this.router.navigateByUrl('/baseInformation/listProvince')
            }
          })
        } else {
          this.toastr.warning('کالایی ثبت نشده ابتدا کالا را وارد کنید!','هشدار')
          this.router.navigateByUrl('/item/addItem')
        }

      })
    }
  }

  goToChat(ticketId) {
    this.router.navigate(['/ticket/chat'], {queryParams: {ticketId: ticketId}});

  }


  // setProvinceAdd(event){
  //     this.city.province.id=event;
  // }
  // setProvinceEdit(event){
  //     this.cityEdit.province.id=event;
  // }
  deleteTicket(id, i) {
    let self = this;
    swal({
      title: 'حذف',
      type: 'warning',
      showCloseButton: true,
      confirmButtonColor: '#321834',
      text: 'آیا از حذف اطمینان دارید؟',
      background: '#e4e4e4',
      showCancelButton: true,
      cancelButtonColor: '#321834',
      cancelButtonText: 'خیر',
      confirmButtonText: 'بله'
    }).then((result) => {
      if (result.value) {
        self.ticketService.deleteTicket(id).subscribe(res => {
          if (res) {
            self.ticketList.splice(i, 1);
            self.toastr.success('درخواست با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });
      }
    })
  }

  editTicket(id) {
    this.mode = 'edit';
    this.ngAfterViewInit()
    // this.userId = id;
    this.ticketService.getTicketById(id).subscribe((res: Ticket) => {
      if (res) {
        this.ticketEdit = res;
        this.ticketEdit.item.id = res.item.id;
      }
    })
  }

  addTicket() {
    this.saveButton = true;
    if (
      this.addForm.controls['itemAdd'].valid
      && this.addForm.controls['titleAdd'].valid
      && this.addForm.controls['descAdd'].valid
    ) {
      this.ticket.user.id = Config.getLocalStorageUser().id;
      this.ticketService.create(this.ticket).subscribe((res: Ticket) => {
        if (res != null) {
          console.log(res);
          this.toastr.success('درخواست با موفقیت افزوده شد','موفق')
          this.mode = '';
          this.ngAfterViewInit();
          this.ticketList.push(res);
          this.ticket = new Ticket();
        }
      });
    }
  }

  updateTicket() {
    this.saveButton2 = true;
    if (
      this.addForm.controls['provinceEdit'].valid
      && this.addForm.controls['cityNameEdit'].valid
    ) {
      this.ticketService.editTicket(this.ticketEdit).subscribe(res => {
        if (res) {
          this.toastr.success('درخواست با موفقیت ویرایش شد','موفق')
          this.mode = '';
          let i = 0;
          for (let item of this.ticketList) {
            if (item.id == this.ticketEdit.id) {
              this.cId = i;
            } else {
              i++;
            }
          }
          this.ticketList.splice(this.cId, 1);
          this.ticketList.push(this.ticketEdit);
          this.ticketEdit = new Ticket();
        }
      });
    }
  }


}
