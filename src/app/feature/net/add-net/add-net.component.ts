import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {MyDate} from "../../../model/helper/MyDate";
import {isNullOrUndefined, isUndefined} from "util";
import {Toolkit} from "../../../base/utility/toolkit";
import {Net} from "../../../model/net/net";
import {NetService} from "../../../service/net/net.service";
import {TicketService} from "../../../service/chat/ticket.service";
import {Ticket} from "../../../model/ticket/ticket";
import {SparePart} from "../../../model/management/storeManagement/sparePart";
import {SparePartService} from "../../../service/management/storeManagement/spare-part.service";
import swal from 'sweetalert2'
import {FileModel} from "../../../model/helper/file-model";
import {AttachmentService} from "../../../service/attachment.service";
import {Document} from "../../../model/document";
import {Config} from "../../../configuration/config";
import {Swal} from "../../../base/utility/swal";
import {Router} from "@angular/router";
import {Validations} from "../../../base/utility/validations";
import {ResponseContent} from "../../../base/helper/response/response-content";
import { DocumentService } from '../../../service/document.service';
import {ToastrService} from "ngx-toastr";
// import * as $ from 'jquery';
declare let $: any;

@Component({
  selector: 'add-net',
  templateUrl: './add-net.component.html',
  styleUrls: ['./add-net.component.scss']
})
export class AddNetComponent implements OnInit, AfterViewInit {
  urlDownload: string;
  cId: number;
  startDate: any = null;
  endDate: any = null;
  dateError: string = null;
  mode: string = '';

  myVal = Validations;
  net: Net = new Net();
  netEdit: Net = new Net();
  netList: Array<Net> = [];
  ticketList: Array<Ticket> = [];
  sparePartList: Array<SparePart> = [];



  // ***************attach************
  AttachmentsFile_srcsDraft: any = null;
  attachmemntPatch: string;
  fileModel: Array<FileModel> = [];
  appdisabled = 1;
  url: string;
  // attachments: Array<Document> = [];
  fileType: string;
  organId: number;

  file_srcsDraft: Array<any> = [];
  letterAttachment: any;
  files: Array<File> = [];
documentList:Array<Document>=[];
  // fileModel: Array<FileModel> = [];
  //  attachmemntPatch: string;

  private attachmentsChild = new EventEmitter<Document[]>();
  private attachmentsFile_srcsDraftChild = new EventEmitter<any>();
  private attachmemntPatchChild = new EventEmitter<any>();
  private fileModelChild = new EventEmitter<FileModel[]>();
  lastModified: string;


  public mask = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, '-', /\d/, /\d/, ':', /\d/, /\d/];

  constructor(private netService: NetService,
              private sparePartService: SparePartService,
              private  attachmentService: AttachmentService,
              private router: Router,
              private toastr: ToastrService,
              private documentService:DocumentService,
              private ticketService: TicketService) {
  }

  // touched(selector){
  //   $(selector).on('click',function(e){
  //     return true;
  //   });
  // }
  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      this.net.documents = [];
      this.net.spareParts = [];
      this.ticketService.getAllTicket().subscribe((res: Ticket[]) => {
        if(res){
          this.ticketList = res;
        }else{
          this.toastr.warning('درخواستی ثبت نشده!','هشدار')
        }
      })
      this.sparePartService.getAllSparePart().subscribe((res: SparePart[]) => {
        this.sparePartList = res;
      })
    }
  }

  add() {
    this.ngAfterViewInit();
    this.mode = 'add';
  }

  cancel() {
    this.mode = '';
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    let self = this;
    // $(document).ready(function () {
    //   $('#startDate').MdPersianDateTimePicker({
    //     Placement: 'buttom',
    //     Trigger: 'click',
    //     EnableTimePicker: false,
    //     TargetSelector: '#startDate',
    //     GroupId: '',
    //     ToDate: false,
    //     FormDate: false,
    //     DisableBeforeToday: false,
    //     Disabled: false,
    //     Format: 'yyyy/MM/dd-h:m-dddd',
    //     IsGregorian: false
    //   });
    // });

    // $(document).ready(function () {
    //   $('#endDate').MdPersianDateTimePicker({
    //     Placement: 'buttom',
    //     Trigger: 'click',
    //     EnableTimePicker: false,
    //     TargetSelector: '#endDate',
    //     GroupId: '',
    //     ToDate: false,
    //     FormDate: false,
    //     DisableBeforeToday: false,
    //     Disabled: false,
    //     Format: 'yyyy/MM/dd-h:m-dddd',
    //     IsGregorian: false
    //   });
    // });

    $(document).ready(function () {
      $('.ticketSelect').select2({
        placeholder: 'درخواست تعمیر'
      }).on('change', (e) => {
        // self.itemEdit.itemCategory.id = ($(e.currentTarget).val());
        self.getNetList($(e.currentTarget).val())
      });
    });
    $(document).ready(function () {
      $('.ticketAdd').select2({
        placeholder: 'درخواست تعمیر'
      }).on('change', (e) => {
        self.net.ticket.id = ($(e.currentTarget).val());
        // self.getNetList(self.net.ticket.id)
      });
    });
    $(document).ready(function () {
      $('.ticketEdit').select2({
        placeholder: 'درخواست تعمیر'
      }).on('change', (e) => {
        self.netEdit.ticket.id = ($(e.currentTarget).val());
        // self.getNetList(self.net.ticket.id)
      });
    });
    $(document).ready(function () {
      $('.sparePartListAdd').select2({
        placeholder: 'قطعات یدکی'
      }).on('change', (e) => {

        self.net.spareParts =
          Toolkit.changeSelectedList(
            self.sparePartList,
            self.net.spareParts,
            $(e.currentTarget).val()
          );
      });
    });

  }

  getNetList(ticketId) {
    this.netService.getNetListByTicketId(ticketId).subscribe((res: Net[]) => {
      this.netList = res;
    })
  }

  checkStartDateEndDate() {
    this.dateError = null;
    if (this.startDate != null && this.endDate != null) {
      let sd = new MyDate();
      sd.year = this.startDate[0];
      sd.month = this.startDate[1];
      sd.day = this.startDate[2];
      sd.hour = '00';
      sd.minute = '00';
      let ed = new MyDate();
      ed.year = this.endDate[0];
      ed.month = this.endDate[1];
      ed.day = this.endDate[2];
      ed.hour = '00';
      ed.minute = '00';
      let result = Toolkit.CompareDate(sd, ed);
      if (result == 2) {
      }
      else {
        this.dateError = 'date error';
      }
    }
    else {
      this.dateError = 'enter start and end dates';
    }
  }

  setStartDate(startDate) {
    // console.log(startDate);
    if (!isNullOrUndefined(startDate) && startDate != '') {
      let date = Toolkit.changeJalaliToGregorian(startDate);
      this.startDate = date;
    }
    else {
      this.startDate = null;
    }
    this.checkStartDateEndDate();
  }

  setEndDate(endDate) {
    if (!isNullOrUndefined(endDate) && endDate != '') {
      let date = Toolkit.changeJalaliToGregorian(endDate);
      this.endDate = date;
    }
    else {
      this.endDate = null;
    }
    this.checkStartDateEndDate();
  }


  // ***************attach***************
  onChangeUploader(input, event) {
    if (input.files.length > 0) {
      this.files = [];
      for (const i of input.files) {
        // console.log(i.size);
        if (i.size < 100000000) {
          const file: FileModel = new FileModel();

          const f = i.type.split('/');
          file.name = i.name;
          file.type = f[0];
          file.lastModified = i.lastModified;

          // if (file.type === 'application') {
          //     const fn = file.name.split('.');
          //     const fnL = fn.length;
          //     const fnT = fn[fnL - 1];
          // if (fnT === 'pdf') {
          this.fileModel.push(file);
          // this.files.push(i);
          this.onUploadFile(i);
          // } else {
          //     swal({
          //         type: 'warning',
          //         name: 'نوع فایل ' + fn[0] + 'باید  pdf باشد',
          //         confirmButtonText: 'نایید!'
          //
          //     });
          // }

          // } else {
          //     swal({
          //         type: 'warning',
          //         name: ' فابل انتخاب شده باید  pdf باشد',
          //         confirmButtonText: 'نایید!'
          //
          //     });
          // }


          this.attachmentsFile_srcsDraftChild.emit(this.files);
        } else {
          swal({
            type: 'warning',
            title: 'حجم فایل ' + i.name + ' نباید بیشتر از 100 مگابایت باشد',
            confirmButtonText: 'نایید!'

          });
        }


      }
      if (this.files.length > 0) {
        // this.onUploadFile();

      }
    }
  }

  onUploadFile(file) {
    this.appdisabled = 0;
    const formData = new FormData();
    // for (let i = 0; i < file.length; i++) {
    //     let x: any;
    //     x = file[i];
    formData.append('file', file);
    // }
    // let y: any;

    // y = file.length;
    // formData.append('count', y);
    this.organId = Config.getLocalStorageUser().organization.id;
    this.attachmentService.uploadFile(formData, this.organId).subscribe((data:ResponseContent) => {
      if (data) {
        this.net.documents.push(data.data);
        // console.log('datasfdsdfsdfsdfs', this.net.documents);
        this.attachmentsChild.emit(this.net.documents);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }
      for (let i = 0; i < this.net.documents.length; i++) {
        // console.log(this.fileModel);
        // console.log(i);
        this.fileModel[i].filePath = this.net.documents[i].path;
        this.fileModelChild.emit(this.fileModel);

      }
      if (this.fileModel.length > 0) {
        this.attachmemntPatch = this.fileModel[0].filePath;
        this.fileModelChild.emit(this.fileModel);

      }


    });
  }

  del(file, i) {
    let attForDelet: Document = new Document();
    attForDelet.path = file.filePath;
    this.attachmentService.delete(attForDelet).subscribe(res => {
      this.fileModel.splice(i, 1);
      this.net.documents.splice(i, 1);
      if (this.fileModel.length > 0) {
        this.attachmemntPatch = this.fileModel[0].filePath;
        this.fileModelChild.emit(this.fileModel);
      }

      if (this.fileModel.length === 0) {
        this.attachmemntPatch = '';
      }
      // console.log('this.fileModel');
      // console.log(this.fileModel);
    });


  }


  deleteNet(id, i) {
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
        self.netService.deleteNet(id).subscribe(res => {
          if (res) {
            self.netList.splice(i, 1);
            self.toastr.success('گزارش تعمیر با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editNet(id) {
    this.mode = 'edit';
    this.ngAfterViewInit()
    // this.userId = id;
    this.netService.getNetById(id).subscribe((res: Net) => {
      if (res != null) {
        this.netEdit = res;
        this.netEdit.ticket.id = res.ticket.id;

      }
    })
  }

  downloads(sparePart) {
    this.documentList=[];
    if(sparePart.length>0){
      $('#documentModal').modal();
      for (let item of sparePart) {
        this.documentService.getDocumentById(item).subscribe((res:Document)=>{

          if(res.contentType=='application/pdf'){
            res.path='assets/images/icon/pdf.png'
          }else if(res.contentType=='image/jpeg'){
            res.path='assets/images/icon/pdf.png'
          }else if(res.contentType=='audio/mp3'){
            res.path='assets/images/icon/mp4.png'
          }else if(res.contentType=='video/mp4'){
            res.path='assets/images/icon/mp4.png'
          }else{
            res.path='assets/images/icon/pdf.png'
          }
          this.documentList.push(res);
        })
      }
    }

  }
  download(id){
    this.urlDownload=Config.getUrl()+'download/'+Config.getLocalStorageUser().organization.id+'/'+id+'?Authorization='+Config.getLocalStorageToken();
    window.open(this.urlDownload)
  }

  addNet() {
    if (!isNullOrUndefined(this.net.title) &&
      !isNullOrUndefined(this.net.description)) {
      this.net.expert.id = Config.getLocalStorageUser().id;
      this.netService.create(this.net).subscribe((res: Net) => {
        if (res != null) {
          this.toastr.success('گزارش تعمیر و نگهداری با موفقیت افزوده شد','موفق')
          this.mode = '';
          this.netList.push(this.net);
          this.net = new Net();
        }
      });
    } else {
      alert()
    }


  }

  updateNet() {
    this.netService.editNet(this.netEdit).subscribe(res => {
      if (res) {
        this.toastr.success('گزارش با موفقیت ویرایش شد','موفق')
        this.mode = '';
        let i = 0;
        for (let item of this.netList) {
          if (item.id == this.netEdit.id) {
            this.cId = i;
          } else {
            i++;
          }
        }
        this.netList.splice(this.cId, 1);
        this.netList.push(this.netEdit);
        this.netEdit = new Net();
      }
    });
  }
  compareDate(){
    if(!isNullOrUndefined(this.net.startDate)
    && !isNullOrUndefined(this.net.endDate)){
      if(!Validations.compareDateTime(this.net.startDate,this.net.endDate)){
        this.net.endDate='';
        this.toastr.error('زمان پایان نمی تواند از زمان شروع کوچکتر باشد','خطا')
      }
    }
  }

}
