import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {Asset} from "../../../model/asset/asset";
import {Category} from "../../../model/baseInformation/category";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../service/baseInformation/category.service";
import {Province} from "../../../model/baseInformation/province";
import {ProvinceService} from "../../../service/baseInformation/province.service";
import {City} from "../../../model/baseInformation/city";
import {AccountService} from "../../../service/asset/account.service";
import {Account} from "../../../model/asset/account";
import {ChargeDepartment} from "../../../model/asset/charge-department";
import {ChargeDepartmentService} from "../../../service/asset/charge-department.service";
import {AssetService} from "../../../service/asset/asset.service";
import {MeteringDataService} from "../../../service/asset/dataService/metering-data.service";
import {Metering} from "../../../model/asset/metering";
import {WarrantyDataService} from "../../../service/asset/dataService/warranty-data.service";
import {Warranty} from "../../../model/asset/warranty";
import {Business} from "../../../model/asset/business";
import {Company} from "../../../model/asset/company";
import {BusinessService} from "../../../service/asset/business.service";
import {FileModel} from "../../../model/helper/file-model";
import {ResponseContent} from "../../../base/helper/response/response-content";
import {Config} from "../../../configuration/config";
import {Document} from "../../../model/document";
import swal from 'sweetalert2'
import {AttachmentService} from "../../../service/attachment.service";
import {PurchaseDataService} from "../../../service/asset/dataService/purchase-data.service";
import {Purchase} from "../../../model/asset/purchase";
import {CompanyDataService} from "../../../service/asset/dataService/company-data.service";
import {PartDataService} from "../../../service/partAndSupply/dataService/part-data.service";
import {Part} from "../../../model/asset/part";
import {Property} from "../../../model/asset/property";
import {PropertyService} from "../../../service/item/property.service";
import {Toolkit} from "../../../base/utility/toolkit";
import {ImageStatus} from "../../../base/helper/enum/ImageStatus";
import {EnumObject} from "../../../base/utility/enum/enum-object";
import {Priority} from "../../../base/helper/enum/priority";
import {EnumHandle} from "../../../base/utility/enum/enum-handle";
import {PropertyType} from "../../../base/helper/enum/asset/property-type.enum";
import {BusinessType} from "../../../base/helper/enum/asset/business-type.enum";
declare let $:any;
@Component({
  selector: 'item-add-form',
  templateUrl: './item-add-form.component.html',
  styleUrls: ['./item-add-form.component.scss']
})
export class ItemAddFormComponent implements OnInit,AfterViewInit {
  showDialog:boolean=false;
  showDialog1:boolean=false;
  organId:number;

  lat: number = 32.76880048488168;
  lng: number = 54.84375;
  zoom: number = 6;

  showAccountModal:boolean=false;
  showChargeDepartmentModal:boolean=false;
  addLocation:boolean=false;
  BOMAddForm:boolean=false;
  meteringAdd:boolean=false;
  businessListModal:boolean=false;
  businessAddModal:boolean=false;
  purchaseAddModal:boolean=false;
  warrantyAddModal:boolean=false;
  propertyAddModal:boolean=false;

  update:boolean=false;


  showAssetSelect:boolean=false;

  asset:Asset=new Asset();
  assetList:Array<Asset>=[];

  category:Category=new Category();
  categoryList:Array<Category>=[];


  provinceList:Array<Province>=[];
  cityList:Array<City>=[];

  account:Account=new Account();
  accountList:Array<Account>=[];



  chargeDepartment:ChargeDepartment=new ChargeDepartment();
  chargeDepartmentList:Array<ChargeDepartment>=[];

  assetListChargeDepartment:Array<Asset>=[];

  business:Business=new Business();
  companyList:Array<Company>=[];

  prop:Property=new Property();
  propertyList:Array<Property>=[];



  // *********************enum********************
  propertyTypeList = [] as EnumObject[];
  businessTypeList = [] as EnumObject[];



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


  constructor(private route:ActivatedRoute,
              private router:Router,
              private categoryService:CategoryService,
              private accountService:AccountService,
              private assetService:AssetService,
              private businessService:BusinessService,
              private meteringData:MeteringDataService,
              private companyData:CompanyDataService,
              private warrantyData:WarrantyDataService,
              private chargeDepartmentService:ChargeDepartmentService,
              private attachmentService:AttachmentService,
              private purchaseData:PurchaseDataService,
              private partData:PartDataService,
              private propertyService: PropertyService,
              private provinceService:ProvinceService) { }
  // $('.js-example-basic-single-categoryList').val(this.categoryList[0].id).trigger('change');

  ngOnInit() {
    // **************intialize**********
    this.asset.meterings=[];
    this.asset.warranties=[];
    this.asset.businesses=[];
    this.asset.properties=[];
    this.asset.documents=[];
    this.asset.purchase=[];
    this.asset.parts=[];
    this.prop.repository=[];



    // **********************enumList********************
    this.propertyTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<PropertyType>(PropertyType));
    this.businessTypeList = EnumHandle.getEnumObjectList(EnumHandle.listEnums<BusinessType>(BusinessType));



    let str:string='';
    this.prop.repository.push(str);

    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        this.category.id=params['categoryId'];
        this.categoryService.getCategoryById(this.category.id).subscribe((res:Category)=> {
          if(res){
          this.category = res;
        }
        });
        this.categoryService.getChildrenById(this.category.id).subscribe((res:Category[])=>{
          if(res){
            this.categoryList=res;
          }
        });
        this.assetService.getAllAssetByCId(this.category.id).subscribe((res:Asset[])=>{
          if(res){
            this.assetList=res;
            this.assetListChargeDepartment=res;
          }
        });
      } else if(params['assetId']){
        this.update=true;
        this.assetService.getOneById(params['categoryId']).subscribe((res:Asset)=>{
          if(res){
            this.asset=res;
          }
        })
      }
    });
    this.provinceService.getAllProvince().subscribe((res:Province[])=>{
      if(res){
        this.provinceList=res;
        this.asset.address.province.id=this.provinceList[0].id;
        this.getCity(this.provinceList[0].id)
      }
    });
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

    this.meteringData.gettingMeteringOne.subscribe((res:Metering)=>{
      if(res){
        this.asset.meterings.push(res);
        this.meteringAdd=false;
      }
    });
    this.warrantyData.gettingWarrantyOne.subscribe((res:Warranty)=>{
      if(res){
        this.asset.warranties.push(res);
        this.warrantyAddModal=false;
      }
    });
    this.purchaseData.gettingPurchaseOne.subscribe((res:Purchase)=>{
      if(res){
        this.asset.purchase.push(res);
        this.purchaseAddModal=false;
      }
    });
    this.companyData.gettingCompanyOne.subscribe((res:Company)=>{
      if(res){
        this.companyList.push(res);
        this.businessAddModal=false;
      }
    });
    this.partData.gettingPartOne.subscribe((res:Part)=>{
      if(res){
        this.asset.parts.push()
        this.BOMAddForm=false;
      }
    })
    this.propertyService.getAllProperty().subscribe((res: Property[]) => {
      if(res){
        this.propertyList = res;
      }
    })





  }

  ngAfterViewInit(){
    let self=this;
    $(document).ready(function () {
      $('.property').select2({
        placeholder: 'ویژگی ها'
      }).on('change', (e) => {
        self.asset.properties =
          Toolkit.changeSelectedList(
            self.propertyList,
            self.asset.properties,
            $(e.currentTarget).val()
          );
        self.ngAfterViewInit()
      });
    });
    $(document).ready(function () {
      $('.sub-categoryList').select2({
        placeholder: 'دسته بندی دارایی'
      }).on('change', (e) => {
        self.asset.category.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.sub-assetList').select2({
        placeholder: 'دارایی'
      }).on('change', (e) => {
        self.asset.parentId=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.province').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        self.getCity($(e.currentTarget).val());
        self.asset.address.province.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.city').select2({
        placeholder: 'شهرستان'
      }).on('change', (e) => {
        self.asset.address.city.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.account').select2({
        placeholder: 'بودجه'
      }).on('change', (e) => {
        self.asset.account.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.chargeDepartment').select2({
        placeholder: 'بخش مسئول تعمیرات'
      }).on('change', (e) => {
        self.asset.chargeDepartment.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.chargeDepartmentLocation').select2({
        placeholder: 'مکان مسئول تعمیرات'
      }).on('change', (e) => {
        self.asset.chargeDepartment.assetId=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.companySelect').select2({
        placeholder: 'انتخاب شرکت'
      }).on('change', (e) => {
        self.business.company.id=$(e.currentTarget).val();
      });
    });
    for(let item of this.asset.properties){
      if(item.type=='selectMulti'){
        $(document).ready(function () {
          $('.'+item.key).select2({
            placeholder: item.key
          }).on('change', (e) => {
            item.data =
              Toolkit.changeSelectedList(
                item.repository,
                item.data,
                $(e.currentTarget).val()
              );
          });
        });
      }
    }
  }
  addAsset(){
    if(this.update){
      this.assetService.editAsset(this.asset).subscribe((res:any)=>{
        if(res){

        }
      })
    }else{
      this.assetService.create(this.asset).subscribe((res:any)=>{
        if(res){
          this.router.navigateByUrl('/item/listAsset')
        }
      })
    }
  }

  getCity(pId){
    this.provinceService.getCityByPId(pId).subscribe((res:City[])=>{
      if(res){
        this.cityList=res;
        this.asset.address.city=this.cityList[0];
      }
    })
  }

  onChange(event){
    if(event.target.checked){
      this.showAssetSelect=true;
      this.ngAfterViewInit()
    }
  }
  onChange1(event){
    if(event.target.checked){
      this.showAssetSelect=false;
      this.asset.parentId=null;
    }
  }

  changeSuggest(event){
    if(event.target.checked){
      this.business.suggest=true
    }else{
      this.business.suggest=false;
    }
  }
  createAccount(){
    this.accountService.create(this.account).subscribe((res:Account)=>{
      if(res){
        this.accountList.push(res);
        this.asset.account.id=res.id;
        this.account=new Account();
        this.showAccountModal=false;
      }
    })
  }

  createChargeDepartment(){
    this.chargeDepartmentService.create(this.chargeDepartment).subscribe((res:ChargeDepartment)=>{
      if(res){
        this.chargeDepartmentList.push(res);
        this.asset.chargeDepartment.id=res.id;
        this.chargeDepartment=new ChargeDepartment();
        this.showChargeDepartmentModal=false;
      }
    })
  }

  createBusiness(){
    this.businessService.create(this.business).subscribe((res:Business)=>{
      if(res){
        this.asset.businesses.push(res);
        this.businessListModal=false;
      }
    });
  }

  selectOne(event,item:Property){
    if(item.data.length==0){
      item.data.push(event.target.value)
    }else{
      item.data=[]
      item.data.push(event.target.value)
    }
  }
  changeAssetStatus(event){
    if(event.target.checked){
      this.asset.status=true;
    }else{
      this.asset.status=false;
    }

  }
  fileChangeListener($event) {
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      // that.cropper2.setImage(image);
      that.asset.image.imageData = image.src;
      that.asset.image.size = file.size;
      const n = that.asset.image.imageData.search(';base64,');
      that.asset.image.extension = '.' + file.type;
      that.asset.image.extension = '.' + that.asset.image.imageData.substring(11, n);
      // that.asset.image.imageData = that.asset.image.imageData.substring(n + 8, that.asset.image.imageData.length);
      that.asset.image.imageStatus = ImageStatus.NEW_IMAGE;

    };
    myReader.readAsDataURL(file);
    console.log(this.asset.image)
  }
  addRepo(){
    let newStr:string='';
    this.prop.repository.push(newStr)
  }
  deleteRepo(i){
    this.prop.repository.splice(i,1)
  }
  createProperty(){
    this.propertyService.create(this.prop).subscribe((res:Property)=>{
      if(res){
        console.log(res);
        this.propertyList.push(res);
        this.asset.properties.push(res);
        this.propertyAddModal=false;
        this.prop=new Property();
      }
    })
  }

  deleteMetering(id,i){
    this.asset.meterings.splice(i,1)
  }
  deleteWarranty(id,i){
    this.asset.warranties.splice(i,1)
  }
  deleteBusiness(id,i){
    this.asset.businesses.splice(i,1)
  }
  deletePurchase(id,i){
    this.asset.purchase.splice(i,1)
  }
  deleteMBOM(id,i){
    this.asset.parts.splice(i,1)
  }
  deleteProperty(i){
    this.asset.properties.splice(i,1)
  }


  showAccountDialog(){
    this.showAccountModal=true;
  }
  showChargeDepartmentDialog(){
    this.showChargeDepartmentModal=true;
    this.ngAfterViewInit();
  }
  showAddLocation(){
    this.addLocation=true;
  }
  showBOMAddForm(){
    this.BOMAddForm=true;
    this.ngAfterViewInit()
  }
  showMeteringAddForm(){
    this.meteringAdd=true;
    this.ngAfterViewInit()
  }
  showBusinessListForm(){
    this.businessListModal=true;
    this.ngAfterViewInit()
  }
  showBusinessAddForm(){
    this.businessAddModal=true;
    this.ngAfterViewInit()
  }
  showPurchaseAddForm(){
    this.purchaseAddModal=true;
  }

  showWarrantyAddForm(){
    this.warrantyAddModal=true;
  }
  showAddPropertyForm(){
    this.propertyAddModal=true;
  }
  mapClicked($event) {
    this.asset.address.lat=$event.coords.lat;
    this.asset.address.lng=$event.coords.lng;
  }
  pushToRefrence(i,value){
    console.log('milad',value)
    this.prop.repository[i]=value;
  }


  // *************************attachFile*********************
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
        this.asset.documents.push(data.data);
        this.attachmentsChild.emit(this.asset.documents);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }

      for (let i = 0; i < this.asset.documents.length; i++) {
        console.log(this.fileModel);
        console.log(i);
        this.fileModel[i].filePath = this.asset.documents[i].path;
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
      this.asset.documents.splice(i, 1);
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
