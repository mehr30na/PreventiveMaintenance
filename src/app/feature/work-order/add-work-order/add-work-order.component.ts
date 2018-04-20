import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {Document} from "../../../model/document";
import {FileModel} from "../../../model/helper/file-model";
import {ResponseContent} from "../../../base/helper/response/response-content";
import {Config} from "../../../configuration/config";
import {WorkOrder} from "../../../model/workOrder/work-order";
import {AttachmentService} from "../../../service/attachment.service";
import {Account} from "../../../model/asset/account";
import {AccountService} from "../../../service/asset/account.service";
import {ChargeDepartment} from "../../../model/asset/charge-department";
import {ChargeDepartmentService} from "../../../service/asset/charge-department.service";
import swal from 'sweetalert2';
import {ImageStatus} from "../../../base/helper/enum/ImageStatus";
import {WorkOrderStatus} from "../../../model/workOrder/work-order-status";
import {WorkOrderStatusService} from "../../../service/workOrder/work-order-status.service";
import {EnumObject} from "../../../base/utility/enum/enum-object";
import {PropertyType} from "../../../base/helper/enum/asset/property-type.enum";
import {EnumHandle} from "../../../base/utility/enum/enum-handle";
import {MaintenanceType} from "../../../base/helper/enum/workOrder/maintenance-type.enum";
import {Priority} from "../../../base/helper/enum/workOrder/priority.enum";
import {AssetService} from "../../../service/asset/asset.service";
import {Asset} from "../../../model/asset/asset";
import {User} from "../../../model/management/userManagement/user";
import {UserService} from "../../../service/management/userManagement/user.service";
import {WorkOrderParts} from "../../../model/workOrder/work-order-parts";
import {PartService} from "../../../service/partAndSupply/part.service";
import {Part} from "../../../model/asset/part";
import {WorkOrderPartService} from "../../../service/workOrder/work-order-part.service";
import {Metering} from "../../../model/asset/metering";
import {MeteringDataService} from "../../../service/asset/dataService/metering-data.service";
import {ScheduledTime} from "../../../model/workOrder/scheduled-time";
import {ScheduledMeteringSingle} from "../../../model/workOrder/scheduled-metering-single";
import {ScheduledMeteringCycle} from "../../../model/workOrder/scheduled-metering-cycle";
import {TimeType} from "../../../model/workOrder/enum/time-type.enum";
import {FixType} from "../../../model/workOrder/enum/fix-type.enum";
import {UnitOfMeasurement} from "../../../model/baseInformation/unitOfMeasurement";
import {MeasurementService} from "../../../service/baseInformation/measurement.service";
import {MiscCost} from "../../../model/workOrder/misc-cost";
import {MiscCostService} from "../../../service/workOrder/misc-cost.service";
import {MiscCostType} from "../../../model/workOrder/misc-cost-type";
import {MiscCostTypeService} from "../../../service/workOrder/misc-cost-type.service";
import {Notify} from "../../../model/workOrder/notify";
import {NotifyEvent} from "../../../base/helper/enum/workOrder/notify-event.enum";
import {NotifyService} from "../../../service/workOrder/notify.service";
import {PartDataService} from "../../../service/partAndSupply/dataService/part-data.service";
import moment = require("jalali-moment");
import {Toolkit} from "../../../base/utility/toolkit";
import {WorkOrderService} from "../../../service/workOrder/work-order.service";
declare let $:any;
@Component({
  selector: 'add-work-order',
  templateUrl: './add-work-order.component.html',
  styleUrls: ['./add-work-order.component.scss']
})
export class AddWorkOrderComponent implements OnInit,AfterViewInit {

  WOStatusAddForm:boolean=false;
  laborTaskForm:boolean=false;
  maintenanceTypeForm:boolean=false;
  assetAddForm:boolean=false;
  projectAddForm:boolean=false;
  partsAddForm:boolean=false;
  addPartForm:boolean=false;
  meteringAdd:boolean=false;
  miscCostAdd:boolean=false;
  notificationAdd:boolean=false;
  userAdd:boolean=false;
  scheduleAdd:boolean=false;
  showAccountModal:boolean=false;
  showChargeDepartmentModal:boolean=false;
  miscCostTypeAdd:boolean=false;
  timePeriod:boolean;
  meterPeriod:boolean;

  organId:number;

  work:WorkOrder=new WorkOrder();
  account:Account=new Account();
  chargeDepartment:ChargeDepartment=new ChargeDepartment();




  workOrderStatus:WorkOrderStatus=new WorkOrderStatus();
  workOrderStatusList:Array<WorkOrderStatus>=[];
  assetList:Array<Asset>=[];
  userList:Array<User>=[];
  partList:Array<Part>=[];
  woPart:WorkOrderParts=new WorkOrderParts();
  scheduleTime:ScheduledTime=new ScheduledTime();
  scheduleMeterSingle:ScheduledMeteringSingle=new ScheduledMeteringSingle();
  scheduleMeterCycle:ScheduledMeteringCycle=new ScheduledMeteringCycle();

  notify:Notify=new Notify();


  maintenanceTypeList=[] as EnumObject[];
  priorityList=[] as EnumObject[];
  timeTypeList=[] as EnumObject[];
  fixTypeList=[] as EnumObject[];
  notifyList=[] as EnumObject[];
  unitList:Array<UnitOfMeasurement>=[];
  meterType:string;
  accountList:Array<Account>=[];
  chargeDepartmentList:Array<ChargeDepartment>=[];

  miscCost:MiscCost=new MiscCost();
  miscCostType:MiscCostType=new MiscCostType();
  miscCostTypeList:Array<MiscCostType>=[];
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



  date1:any;
  date2:any;
  date3:any;
  date4:any;
  date5:any;

  constructor(private attachmentService:AttachmentService,
              private accountService:AccountService,
              private workOrderStatusService:WorkOrderStatusService,
              private assetService:AssetService,
              private userService:UserService,
              private partService:PartService,
              private woPartService:WorkOrderPartService,
              private meteringData:MeteringDataService,
              private unitService:MeasurementService,
              private miscCostService:MiscCostService,
              private miscCostTypeService:MiscCostTypeService,
              private notifyService:NotifyService,
              private partData:PartDataService,
              private workOrderService:WorkOrderService,
              private chargeDepartmentService:ChargeDepartmentService) { }

  ngAfterViewInit() {
    let self = this;
    $(document).ready(function () {
      $('.workOrderStatus').select2({
        placeholder: 'استتوس'
      }).on('change', (e) => {
        self.work.status.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.maintenanceType').select2({
        placeholder: 'نوع بازدید'
      }).on('change', (e) => {
        self.work.maintenanceType=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.workOrderPriority').select2({
        placeholder: 'اولویت'
      }).on('change', (e) => {
        self.work.priority=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.workOrderAsset').select2({
        placeholder: 'دارایی'
      }).on('change', (e) => {
        self.work.asset.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.workOrderProject').select2({
        placeholder: 'پروژه'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.assignToUser').select2({
        placeholder: 'کاربر'
      }).on('change', (e) => {
        self.work.userAssigned.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.completeWork').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {
        self.work.completedUser.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.taskType').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.assignTaskToUser').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.assignTaskToUserComplete').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.partList').select2({
        placeholder: 'قطعه'
      }).on('change', (e) => {
        self.woPart.part.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.userListWorkOrder').select2({
        placeholder: 'قطعه'
      }).on('change', (e) => {
        self.notify.user.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.periodTime').select2({
        placeholder: 'نوع زمان دوره'
      }).on('change', (e) => {
        self.work.scheduledTime.cycle=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.periodType').select2({
        placeholder: 'نوع دوره'
      }).on('change', (e) => {
        self.work.scheduledTime.fixType=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.periodTypeMeter').select2({
        placeholder: 'نوع دوره'
      }).on('change', (e) => {
        self.meterType=$(e.currentTarget).val();
        self.ngAfterViewInit()
      });
    });
    $(document).ready(function () {
      $('.unitOfPeriodType2').select2({
        placeholder: 'واحد'
      }).on('change', (e) => {
        self.work.meteringCycle.unit.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.unitOfPeriodType3').select2({
        placeholder: 'واحد'
      }).on('change', (e) => {
        self.work.meteringSingle.unit.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.makeWorkOrderAt').select2({
        placeholder: 'نوع دوره'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.account').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {
        self.work.account.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.chargeDepartment').select2({
        placeholder: 'مسئول تعمیرات'
      }).on('change', (e) => {
        self.work.chargeDepartment.id=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.chargeDepartmentLocation').select2({
        placeholder: 'مسئول تعمیرات'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.compare').select2({
        placeholder: 'ساخت در'
      }).on('change', (e) => {
        self.work.meteringSingle.compare=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.miscCostTypeList').select2({
        placeholder: 'ساخت در'
      }).on('change', (e) => {
        self.miscCost.miscCostType.id=$(e.currentTarget).val();
      });
    });
  }

  ngOnInit() {
    this.date1= moment('1397-02-01','jYYYY,jMM,jDD');
    this.date2= moment('1397-02-01','jYYYY,jMM,jDD');
    this.date3= moment('1397-02-01','jYYYY,jMM,jDD');
    this.date4= moment('1397-02-01','jYYYY,jMM,jDD');
    this.date5= moment('1397-02-01','jYYYY,jMM,jDD');





    this.maintenanceTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<MaintenanceType>(MaintenanceType));
    this.priorityList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<Priority>(Priority));
    this.timeTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<TimeType>(TimeType));
    this.fixTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<FixType>(FixType));
    this.notifyList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<NotifyEvent>(NotifyEvent));
    this.notify.events=[];

    this.unitService.getAllMeasurement().subscribe((res:UnitOfMeasurement[])=>{
      if(res){
        this.unitList=res;
      }
    })
    this.workOrderStatusService.getAllWorkOrderStatus().subscribe((res:WorkOrderStatus[])=>{
      if(res){
        this.workOrderStatusList=res;
      }
    });
    this.assetService.getAllAsset().subscribe((res:Asset[])=>{
      if(res){
        this.assetList=res;
      }
    });
    this.userService.getAllUser().subscribe((res:User[])=>{
      if(res){
        this.userList=res;
      }
    });
    this.partService.getAllPart().subscribe((res:Part[])=>{
      if(res){
        this.partList=res
      }
    });
    this.meteringData.gettingMeteringOneWO.subscribe((res:Metering)=>{
      if(res){
        this.work.meterReadings.push(res);
        this.meteringAdd=false;
      }
    });
    this.partData.gettingPartOneWO.subscribe((res:Part)=>{
      if(res){
        this.partList.push(res);
        this.addPartForm=false;
      }
    });
  }

  onChange(event,type){
    if(event.target.checked &&type=='time'){
      this.meterPeriod=false;
      this.timePeriod=true;
      this.ngAfterViewInit()
    }else if(event.target.checked &&type=='meter'){
      this.meterPeriod=true;
      this.timePeriod=false;
      this.ngAfterViewInit()
    }
  }
  change1(event){
    if(event.target.checked){
      this.scheduleTime.createWo=true;
    }else{
      this.scheduleTime.createWo=false;
    }
  }
  onChange2(event){
    if(event.target.checked){
      this.scheduleMeterCycle.endOn=null;
    }else{

    }
  }

  creatWOPart(){
    this.woPartService.create(this.woPart).subscribe((res:WorkOrderParts)=>{
      if(res){
        this.work.workOrderParts.push(res)
        this.partsAddForm=false;
      }
    })
  }
  creteMiscCost(){
    this.miscCostService.create(this.miscCost).subscribe((res:MiscCost)=>{
      if(res){
        this.work.miscCosts.push(res)
        this.miscCostAdd=false;
      }
    })
  }
  creteMiscCostType(){
    this.miscCostTypeService.create(this.miscCostType).subscribe((res:MiscCostType)=>{
      if(res){
        this.miscCostTypeList.push(res)
        this.miscCostTypeAdd=false;
      }
    })
  }
  checkNotify(event){
    this.notify.events.push(event.target.value);
  }

  createNotify(){
    this.notifyService.create(this.notify).subscribe((res:Notify)=>{
      if(res){
        this.work.notifications.push(res);
        this.notificationAdd=false;
        this.notify=new Notify();
        this.notify.events=[]
      }
    })
  }


  deleteWoPart(id,i){
    this.work.workOrderParts.splice(i,1)
  }
  deleteNotify(id,i){
    this.work.notifications.splice(i,1)
  }

  deleteMetering(id,i){
    this.work.meterReadings.splice(i,1)
  }
  deleteMiscCost(id,i){
    this.work.miscCosts.splice(i,1)
  }

  showWOStatusAddModal(){
    this.WOStatusAddForm=true
    this.ngAfterViewInit()
  }
  showMaintenanceTypeDialog(){
    this.maintenanceTypeForm=true
    this.ngAfterViewInit()
  }
  showLaborTaskAddForm(){
    this.laborTaskForm=true;
    this.ngAfterViewInit()
  }
  showAssetAddDialog(){
    this.assetAddForm=true;
    this.ngAfterViewInit()
  }
  showProjectDialog(){
    this.projectAddForm=true;
    this.ngAfterViewInit()
  }
  showPartsAddForm(){
    this.partsAddForm=true;
    this.ngAfterViewInit()
  }
  showAddPartDialog(){
    this.addPartForm=true;
    this.ngAfterViewInit()
  }
  showMeteringAddForm(){
    this.meteringAdd=true;
    this.ngAfterViewInit()
  }
  showMiscCostAddForm(){
    this.miscCostAdd=true;
    this.ngAfterViewInit()
  }
  showNotificationAddForm(){
    this.notificationAdd=true;
    this.ngAfterViewInit()
  }
  showUserDialog(){
    this.userAdd=true;
    this.ngAfterViewInit()
  }
  showScheduleAddForm(){
    this.scheduleAdd=true;
  }
  showAccountDialog(){
    this.showAccountModal=true;
    this.ngAfterViewInit()
  }
  showChargeDepartmentDialog(){
    this.showChargeDepartmentModal=true;
    this.ngAfterViewInit();
  }

  addWorkOrder(){
    this.work.completionDate=Toolkit.changeJalaliToGregorian(this.date1.format('jYYYY/jMM/jDD'));
    if(this.timePeriod){
      this.work.scheduledTime.startOn=Toolkit.changeJalaliToGregorian(this.date2.format('jYYYY/jMM/jDD'));
      this.work.scheduledTime.endOn=Toolkit.changeJalaliToGregorian(this.date3.format('jYYYY/jMM/jDD'));
    }else if(this.meterType=='meterEvery' &&this.meterPeriod){
      this.work.meteringCycle.startOn=Toolkit.changeJalaliToGregorian(this.date4.format('jYYYY/jMM/jDD'));
      this.work.meteringCycle.endOn=Toolkit.changeJalaliToGregorian(this.date5.format('jYYYY/jMM/jDD'));
    }

  }











  createAccount(){
    this.accountService.create(this.account).subscribe((res:Account)=>{
      if(res){
        this.accountList.push(res);
        this.work.account.id=res.id;
        this.account=new Account();
        this.showAccountModal=false;
      }
    })
  }
  createChargeDepartment(){
    this.chargeDepartmentService.create(this.chargeDepartment).subscribe((res:ChargeDepartment)=>{
      if(res){
        this.chargeDepartmentList.push(res);
        this.work.chargeDepartment.id=res.id;
        this.chargeDepartment=new ChargeDepartment();
        this.showChargeDepartmentModal=false;
      }
    })
  }
  createWorkOrderStatus(){
    this.workOrderStatusService.create(this.workOrderStatus).subscribe((res:WorkOrderStatus)=>{
      if(res){
        this.work.status.id=res.id;
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
      that.work.image.imageData = image.src;
      that.work.image.size = file.size;
      const n = that.work.image.imageData.search(';base64,');
      that.work.image.extension = '.' + file.type;
      that.work.image.extension = '.' + that.work.image.imageData.substring(11, n);
      that.work.image.imageData = that.work.image.imageData.substring(n + 8, that.work.image.imageData.length);
      that.work.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);
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
        this.work.documents.push(data.data);
        this.attachmentsChild.emit(this.work.documents);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }

      for (let i = 0; i < this.work.documents.length; i++) {
        console.log(this.fileModel);
        console.log(i);
        this.fileModel[i].filePath = this.work.documents[i].path;
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
      this.work.documents.splice(i, 1);
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
