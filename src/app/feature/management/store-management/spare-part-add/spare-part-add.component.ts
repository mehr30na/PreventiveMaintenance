import {Component, EventEmitter, OnInit} from '@angular/core';
import {SparePart} from "../../../../model/management/storeManagement/sparePart";
import {SparePartService} from "../../../../service/management/storeManagement/spare-part.service";
import {Swal} from "../../../../base/utility/swal";
import swal from 'sweetalert2'
import {Document} from "../../../../model/document";
import {FileModel} from "../../../../model/helper/file-model";
import {ImageStatus} from "../../../../base/helper/enum/ImageStatus";
import {Config} from "../../../../configuration/config";
import {Router} from "@angular/router";
import {Image} from "../../../../model/Image";
import {PurchasingResources} from "../../../../model/management/storeManagement/purchasingResources";
import {Collector} from "../../../../model/management/storeManagement/collector";
import {PurchasingResourcesService} from "../../../../service/management/storeManagement/purchasing-resources.service";
import {CollectorService} from "../../../../service/management/storeManagement/collector.service";
import {AttachmentService} from "../../../../service/attachment.service";
import {NewSparePart} from "../../../../model/management/storeManagement/newSparePart";
import {NewSparePartService} from "../../../../service/management/storeManagement/new-spare-part.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DocumentService} from "../../../../service/document.service";
import {MyPattern} from "../../../../base/helper/myPattern";
import {ResponseContent} from "../../../../base/helper/response/response-content";
declare let $:any;
@Component({
  selector: 'app-spare-part-add',
  templateUrl: './spare-part-add.component.html',
  styleUrls: ['./spare-part-add.component.scss']
})
export class SparePartAddComponent implements OnInit {
  sparePart: SparePart = new SparePart();
  sparePartEdit: SparePart = new SparePart();
  newEdit: NewSparePart = new NewSparePart();
  sparePartList: Array<NewSparePart> = [];
  purchasingResList: Array<PurchasingResources> = [];
  collectorList: Array<Collector> = [];
  mode: string = '';
  sId: number;
  AttachmentsFile_srcsDraft: any = null;
  attachmemntPatch: string;
  fileModel: Array<FileModel> = [];


  newSparePart: NewSparePart = new NewSparePart();


  // **********attachment************
  appdisabled = 1;
  url: string;
  // attachments: Array<Document> = [];
  fileType: string;
  organId: number;

  file_srcsDraft: Array<any> = [];
  letterAttachment: any;
  files: Array<File> = [];

  // fileModel: Array<FileModel> = [];
  //  attachmemntPatch: string;

  private attachmentsChild = new EventEmitter<Document[]>();
  private attachmentsFile_srcsDraftChild = new EventEmitter<any>();
  private attachmemntPatchChild = new EventEmitter<any>();
  private fileModelChild = new EventEmitter<FileModel[]>();
  lastModified: string;
  documentList:Array<Document>=[];

  urlDownload: string;
  saveButton: boolean;
  saveButton2: boolean;
  form: FormGroup;
  editForm: FormGroup;

  constructor(private sparePartService: SparePartService,
              private purchasingResourcesService: PurchasingResourcesService,
              private collectorService: CollectorService,
              private router: Router,
              private documentService:DocumentService,
              private toastr: ToastrService,
              private  attachmentService: AttachmentService,
              private fb: FormBuilder) {
    this.form = fb.group({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(null,[Validators.pattern(MyPattern.number),Validators.required]),
      purchasingRes: new FormControl(null, [Validators.required]),
      collector: new FormControl(null, [Validators.required]),
    });
    this.editForm = fb.group({
      editName: new FormControl(null, [Validators.required]),
      editCost: new FormControl(null, [Validators.pattern(MyPattern.number),Validators.required]),
      editPurchasingRes: new FormControl(null, [Validators.required]),
      sparePartEdit: new FormControl(null, [Validators.required]),
    });
  }


  add() {
    this.mode = 'add';
  }

  cancel() {
    this.mode = '';
    this.sparePart = new SparePart();
    this.sparePartEdit = new SparePart();
  }

  ngOnInit() {
    if (Config.getLocalStorageToken() == null) {
      this.router.navigateByUrl('/authentication/signIn');
    } else {
      // this.mode = 'add';
      this.sparePart.sparePartDocuments = [];
      this.sparePartService.getAllNewSparePart().subscribe((res: NewSparePart[]) => {
        if (res) {
          this.sparePartList = res;
          console.log(res);
        } else {
          this.toastr.warning('موجودی در انبار وجود ندارد!','هشدار')
        }
      });
      this.collectorService.getAllCollector().subscribe((res: Collector[]) => {
        if(res){
          this.collectorList = res;
        }else{
          this.toastr.warning('سازنده ای ثبت نشده !','هشدار')
        }
      });
      this.purchasingResourcesService.getAllPurchasingResources().subscribe((res: PurchasingResources[]) => {
        if(res){
          this.purchasingResList = res;
        }else{
          this.toastr.warning('منبع خریدی ثبت نشده!','هشدار')
        }
      })
    }
  }

  deleteSparePart(id, i) {
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
        self.sparePartService.deleteSparePart(id).subscribe(res => {
          if (res) {
            self.sparePartList.splice(i, 1);
            self.toastr.success('قطعه با موفقیت حذف شد','موفق')
          } else {
            self.toastr.error('هنگام حذف مشکلی رخ داده است','خطا')
          }
        });

      }
    })
  }

  editSparePart(id) {
    this.mode = 'edit';
    // this.userId = id;

    this.sparePartService.getNewSparePartById(id).subscribe((res: NewSparePart) => {
      // alert(JSON.stringify(res));
      if (res != null) {
        this.newEdit = res;
        this.sparePartEdit.name = res.name;
        this.sparePartEdit.cost = res.cost;
        this.sparePartEdit.collector.id = res.collectorId;
        this.sparePartEdit.purchasingResources.id = res.purchesingResId;
        this.sparePartEdit.id = res.id;
        let i: number = 0;
        // for(let item of this.sparePartEdit.sparePartDocuments){
        //   item.id=res.documentId[i];
        //   i=i+1;
        // }


        this.collectorService.getAllCollector().subscribe((res: Collector[]) => {
          this.collectorList = res;
        });
        this.purchasingResourcesService.getAllPurchasingResources().subscribe((res: PurchasingResources[]) => {
          this.purchasingResList = res;
        })
      }
    })
  }

  addSparePart() {
    this.saveButton = true;
    if (
      this.form.controls['name'].valid
      && this.form.controls['cost'].valid
      && this.form.controls['purchasingRes'].valid
      && this.form.controls['collector'].valid
    ) {
      console.log(this.sparePart)
      this.sparePartService.create(this.sparePart).subscribe((res: NewSparePart) => {
        if (res !== null) {
          console.log(res)
          this.toastr.success('قطعه با موفقیت به انبار افزوده شد', 'موفق')
          // this.provinceDataService.setProvinceOne(res);
          this.mode = '';
          this.sparePartList.push(res);
          this.sparePart = new SparePart();
          this.mode = ''
        }
      });
    }
  }

  updateSparePart() {
    this.saveButton2 = true;
    if (
      this.form.controls['editName'].valid
      && this.form.controls['editCost'].valid
      && this.form.controls['editPurchasingRes'].valid
      && this.form.controls['sparePartEdit'].valid
    ) {
      this.sparePartService.editSparePart(this.sparePartEdit).subscribe((res: NewSparePart) => {
        if (res) {
          this.toastr.success('اطلاعات قطعه با موفقیت ویرایش شد','موفق')
          this.mode = '';
          let i = 0;
          // for (let item of this.sparePartList) {
          //   if (item.id == this.sparePartEdit.id) {
          //     this.sId = i;
          //   } else {
          //     i++;
          //   }
          // }
          this.sparePartList.splice(this.sId, 1);
          this.sparePartList.push(res);
          this.sparePartEdit = new SparePart();
        }
      });
    }
  }


  // **********attachment************
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
        this.sparePart.sparePartDocuments.push(data.data);
        console.log('datasfdsdfsdfsdfs', this.sparePart.sparePartDocuments);
        this.attachmentsChild.emit(this.sparePart.sparePartDocuments);
        this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
        this.appdisabled = 1;
      }

      for (let i = 0; i < this.sparePart.sparePartDocuments.length; i++) {
        console.log(this.fileModel);
        console.log(i);
        this.fileModel[i].filePath = this.sparePart.sparePartDocuments[i].path;
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
      this.sparePart.sparePartDocuments.splice(i, 1);
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

  showAttachmemntimage(file) {
    console.log(file);
    this.fileType = 'hjh';
    this.attachmemntPatch = 'kljkljkl';


    // if (file.type === 'application') {
    //     this.fileType = 'application';
    this.lastModified = file.lastModified;
    this.setAttachmemntPdfPatch(file.filePath);

    // }
  }


  setAttachmemntPdfPatch(file_src) {
    this.attachmemntPatch = this.url + file_src;
    this.attachmemntPatchChild.emit(this.sparePart.sparePartDocuments);
  }

  // ******************end*************
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



}
