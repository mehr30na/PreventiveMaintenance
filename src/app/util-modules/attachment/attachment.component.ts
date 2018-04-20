import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {Attachment} from "../../model/helper/Attachment";

import {Http} from "@angular/http";
import {Config} from "../../configuration/config";
import swal from 'sweetalert2'
import {AttachmentService} from "../../service/attachment.service";
import {FileModel} from "../../model/helper/file-model";
import {Document} from "../../model/document";
import {ResponseContent} from "../../base/helper/response/response-content";

declare var $: any;

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit, AfterViewInit {

  appdisabled = 1;
  url: string;
  attachments: Array<Document> = [];
  fileType: string;
  organId: number;

  @Input('AttachmentsFile_srcsDraft') file_srcsDraft: Array<any> = [];
  @Input('letterAttachment') letterAttachment: any;
  @Input('files') files: Array<File> = [];

  @Input('fileModel') fileModel: Array<FileModel> = [];
  @Input('attachmemntPatch') attachmemntPatch: string;

  @Output('attachmentsChild') private attachmentsChild = new EventEmitter<Document[]>();
  @Output('attachmentsFile_srcsDraftChild') private attachmentsFile_srcsDraftChild = new EventEmitter<any>();

  @Output('attachmemntPatchChild') private attachmemntPatchChild = new EventEmitter<any>();
  @Output('fileModelChild') private fileModelChild = new EventEmitter<FileModel[]>();
  lastModified: string;

  constructor(private http: Http,
              private  attachmentService: AttachmentService) {
    this.url = Config.getUrl();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }


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

      }
      // console.log('data', data);
      this.attachments.push(data.data);
      this.attachmentsChild.emit(this.attachments);
      this.attachmentsFile_srcsDraftChild.emit(this.file_srcsDraft);
      this.appdisabled = 1;

      for (let i = 0; i < this.attachments.length; i++) {
        // console.log(this.fileModel);
        // console.log(i);
        this.fileModel[i].filePath = this.attachments[i].path;
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
      this.attachments.splice(i, 1);
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

  showAttachmemntimage(file) {
    // console.log(file);
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
    this.attachmemntPatchChild.emit(this.attachments);
  }
}
