import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Warranty} from "../../../model/asset/warranty";
import {AccountService} from "../../../service/asset/account.service";
import {PartService} from "../../../service/partAndSupply/part.service";
import {ChargeDepartment} from "../../../model/asset/charge-department";
import {PartDataService} from "../../../service/partAndSupply/dataService/part-data.service";
import {AssetService} from "../../../service/asset/asset.service";
import {Account} from "../../../model/asset/account";
import {Part} from "../../../model/asset/part";
import {AttachmentService} from "../../../service/attachment.service";
import {MeteringDataService} from "../../../service/asset/dataService/metering-data.service";
import {Document} from "../../../model/document";
import {FileModel} from "../../../model/helper/file-model";
import {ResponseContent} from "../../../base/helper/response/response-content";
import {Metering} from "../../../model/asset/metering";
import {WarrantyDataService} from "../../../service/asset/dataService/warranty-data.service";
import {ChargeDepartmentService} from "../../../service/asset/charge-department.service";
import {Config} from "../../../configuration/config";
import {Asset} from "../../../model/asset/asset";
import swal from 'sweetalert2'
import {ImageStatus} from "../../../base/helper/enum/ImageStatus";
declare let $:any;
@Component({
  selector: 'add-supply',
  templateUrl: './add-supply.component.html',
  styleUrls: ['./add-supply.component.scss']
})
export class AddSupplyComponent implements OnInit , AfterViewInit, OnDestroy {
  showAccountModalBOM: boolean = false;
  showChargeDepartmentModalBOM: boolean = false;
  meteringAddBOM: boolean = false;
  warrantyAddModalBOM: boolean = false;
  int: any;
  Show2:boolean;

  organId:number;

  part:Part=new Part();

  accountList:Array<Account>=[];
  account:Account=new Account();
  chargeDepartmentList:Array<ChargeDepartment>=[];
  chargeDepartment:ChargeDepartment=new ChargeDepartment();
  assetListChargeDepartmentBOM:Array<Asset>=[];

  appdisabled = 1;
  url: string;
  // attachments: Array<Document> = [];
  fileType: string;
  file_srcsDraft: Array<any> = [];
  letterAttachment: any;
  files: Array<File> = [];
  AttachmentsFile_srcsDraft: any = null;
  attachmemntPatch: string;
  fileModel: Array<FileModel> = [];
  private attachmentsChild = new EventEmitter<Document[]>();
  private attachmentsFile_srcsDraftChild = new EventEmitter<any>();
  private attachmemntPatchChild = new EventEmitter<any>();
  private fileModelChild = new EventEmitter<FileModel[]>();
  lastModified: string;
  documentList:Array<Document>=[];

  constructor(private accountService:AccountService,
              private attachmentService:AttachmentService,
              private assetService:AssetService,
              private meteringData:MeteringDataService,
              private warrantyData:WarrantyDataService,
              private partService:PartService,
              private partData:PartDataService,
              private chargeDepartmentService:ChargeDepartmentService) {
  }
  ngOnInit() {
    this.part.warranties=[];
    this.part.users=[];
    this.part.meterings=[];
    this.part.documents=[];

    this.accountService.getAllAccount().subscribe((res:Account[])=>{
      if(res){
        this.accountList=res;
      }
    });
    this.chargeDepartmentService.getAllChargeDepartment().subscribe((res:ChargeDepartment[])=>{
      if(res){
        this.chargeDepartmentList=res;
      }
    });
    this.assetService.getAllAssetByCId(1).subscribe((res:Asset[])=>{
      if(res){
        this.assetListChargeDepartmentBOM=res;
      }
    });
    this.meteringData.gettingMeteringOneBOM.subscribe((res:Metering)=>{
      if(res){
        this.part.meterings.push(res);
        this.meteringAddBOM=false;
      }
    });
    this.warrantyData.gettingWarrantyOneBOM.subscribe((res:Warranty)=>{
      if(res){
        this.part.warranties.push(res);
        this.warrantyAddModalBOM=false;
      }
    });
  }
  ngAfterViewInit() {
    let self = this;
    $(document).ready(function () {
      $('.accountBOM').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {
        self.part.account.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.chargeDepartmentBOM').select2({
        placeholder: 'بخش مسئول تعمیرات'
      }).on('change', (e) => {
        self.part.chargeDepartement.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.chargeDepartmentLocationBOM').select2({
        placeholder: 'مکان مسئول تعمیرات'
      }).on('change', (e) => {
        self.chargeDepartment.assetId=$(e.currentTarget).val()
      });
    });
  }

  showAccountDialog() {
    this.showAccountModalBOM = true;
  }

  showChargeDepartmentDialog() {
    this.showChargeDepartmentModalBOM = true;
    this.ngAfterViewInit();
  }

  showMeteringAddFormBOM() {
    this.meteringAddBOM = true;
    this.ngAfterViewInit()
  }
  showWarrantyAddFormBOM(){
    this.warrantyAddModalBOM=true;
  }


  deleteMetering(id,i){
    this.part.meterings.splice(i,1)
  }
  createAccount(){
    this.accountService.create(this.account).subscribe((res:Account)=>{
      if(res){
        this.accountList.push(res);
        this.part.account.id=res.id;
        this.account=new Account();
        this.showAccountModalBOM=false;
      }
    })
  }
  createChargeDepartment(){
    this.chargeDepartmentService.create(this.chargeDepartment).subscribe((res:ChargeDepartment)=>{
      if(res){
        this.chargeDepartmentList.push(res);
        this.part.chargeDepartement.id=res.id;
        this.chargeDepartment=new ChargeDepartment();
        this.showChargeDepartmentModalBOM=false;
      }
    })
  }

  fileChangeListener($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.cropper2.setImage(image);
      that.part.image.imageData = image.src;
      that.part.image.size = file.size;
      const n = that.part.image.imageData.search(';base64,');
      that.part.image.extension = '.' + file.type;
      that.part.image.extension = '.' + that.part.image.imageData.substring(11, n);
      that.part.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);
  }

  addBOM(){
    this.partService.create(this.part).subscribe((res:Part)=>{
      if(res){
      }
    })

  }



  ngOnDestroy() {

  }









  onChangeUploader(input, event) {
    if (input.files.length > 0) {
      this.files = [];
      for (const i of input.files) {
        console.log(i.size);
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
        this.part.documents.push(data.data);
        this.attachmentsChild.emit(this.part.documents);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }

      for (let i = 0; i < this.part.documents.length; i++) {
        console.log(this.fileModel);
        console.log(i);
        this.fileModel[i].filePath = this.part.documents[i].path;
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
      this.part.documents.splice(i, 1);
      if (this.fileModel.length > 0) {
        this.attachmemntPatch = this.fileModel[0].filePath;
        this.fileModelChild.emit(this.fileModel);
      }

      if (this.fileModel.length === 0) {
        this.attachmemntPatch = '';
      }
      console.log('this.fileModel');
      console.log(this.fileModel);
    });


  }

}
