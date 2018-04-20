import {AfterViewInit, Component, EventEmitter, OnInit} from '@angular/core';
import {City} from "../../../model/baseInformation/city";
import {ProvinceService} from "../../../service/baseInformation/province.service";
import {Business} from "../../../model/asset/business";
import {Company} from "../../../model/asset/company";
import {Province} from "../../../model/baseInformation/province";
import {Currency} from "../../../model/asset/currency";
import {CurrencyService} from "../../../service/asset/currency.service";
import {Document} from "../../../model/document";
import {FileModel} from "../../../model/helper/file-model";
import {Config} from "../../../configuration/config";
import {ResponseContent} from "../../../base/helper/response/response-content";
import swal from 'sweetalert2'
import {AttachmentService} from "../../../service/attachment.service";
import {CompanyService} from "../../../service/asset/company.service";
import {CompanyDataService} from "../../../service/asset/dataService/company-data.service";
import {User} from "../../../model/management/userManagement/user";
import {Asset} from "../../../model/asset/asset";
declare let $:any;
@Component({
  selector: 'business-add-form',
  templateUrl: './business-add-form.component.html',
  styleUrls: ['./business-add-form.component.scss']
})
export class BusinessAddFormComponent implements OnInit,AfterViewInit {


  lat: number = 32.76880048488168;
  lng: number = 54.84375;
  zoom: number = 6;


  showCurrencyAddForm:boolean=false;

  company:Company=new Company();

  cityList:Array<City>=[];
  provinceList:Array<Province>=[];
  currencyListCompany:Array<Currency>=[];
  currency:Currency=new Currency();


  organId:number;

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

  constructor(private provinceService:ProvinceService,
              private attachmentService:AttachmentService,
              private companyService:CompanyService,
              private companyData:CompanyDataService,
              private currencyService:CurrencyService) { }

  ngOnInit() {
    this.company.documents=[]
    this.company.assets=[]
    this.company.users=[]
    this.provinceService.getAllProvince().subscribe((res:Province[])=>{
      if(res){
        this.provinceList=res;
        this.company.address.province.id=this.provinceList[0].id;
        this.getCity(this.provinceList[0].id)
      }
    });
    this.currencyService.getAllCurrency().subscribe((res:Currency[])=>{
      if(res){
        this.currencyListCompany=res;
      }
    })
  }

  ngAfterViewInit(){
    let self=this;
    $(document).ready(function () {
      $('.provinceBusiness').select2({
        placeholder: 'استان'
      }).on('change', (e) => {
        self.company.address.province.id=$(e.currentTarget).val();
        self.getCity($(e.currentTarget).val())
      });
    });
    $(document).ready(function () {
      $('.cityBusiness').select2({
        placeholder: 'شهرستان'
      }).on('change', (e) => {
        self.company.address.city=$(e.currentTarget).val();
      });
    });
    $(document).ready(function () {
      $('.currencyCompany').select2({
        placeholder: 'واحد پول'
      }).on('change', (e) => {
        self.company.currency.id=$(e.currentTarget).val()
      });
    });
    $(document).ready(function () {
      $('.chargeDepartment').select2({
        placeholder: 'بخش مسئول تعمیرات'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.chargeDepartmentLocation').select2({
        placeholder: 'مکان مسئول تعمیرات'
      }).on('change', (e) => {

      });
    });
    $(document).ready(function () {
      $('.businessSelect').select2({
        placeholder: 'انتخاب شرکت'
      }).on('change', (e) => {

      });
    });
  }

  getCity(pId){
    this.provinceService.getCityByPId(pId).subscribe((res:City[])=>{
      if(res){
        this.cityList=res;
        this.company.address.city=this.cityList[0];
      }
    })
  }

  mapClicked($event) {
    this.company.address.lat=$event.coords.lat;
    this.company.address.lng=$event.coords.lng;
  }
  showCurrencyAddModal(){
    this.showCurrencyAddForm=true;
  }
  createCurrency(){
    this.currencyService.create(this.currency).subscribe((res:Currency)=>{
      if(res){
        this.currencyListCompany.push(res);
        this.company.currency.id=res.id;
        this.showCurrencyAddForm=false
      }
    })
  }

  addCompany(){
    this.companyService.create(this.company).subscribe((res:Company)=>{
      if(res){
        this.companyData.setCompanyOne(res);
      }
    });
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
        this.company.documents.push(data.data);
        console.log('datasfdsdfsdfsdfs', this.company.documents);
        this.attachmentsChild.emit(this.company.documents);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }

      for (let i = 0; i < this.company.documents.length; i++) {
        console.log(this.fileModel);
        console.log(i);
        this.fileModel[i].filePath = this.company.documents[i].path;
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
      this.company.documents.splice(i, 1);
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
