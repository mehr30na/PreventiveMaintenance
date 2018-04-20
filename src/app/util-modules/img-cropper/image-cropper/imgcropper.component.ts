import {Component, OnInit, ViewChild, Type, Output, EventEmitter, Input} from '@angular/core';
import {CropperSettings, ImageCropperComponent, Bounds} from 'ng2-img-cropper';
import swal from 'sweetalert2'

@Component({
  selector: 'app-imgcropper',
  templateUrl: './imgcropper.component.html',
})
export class ImgcropperComponentSelf {
  data: any;
  @Input() cropperSettings: CropperSettings;
  @Output() onPush = new EventEmitter();
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  show = false;
  select = false;
  setImage = false;

  constructor() {
    if (!this.cropperSettings)
      this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.height = 80;
    this.cropperSettings.width = 80;
    this.cropperSettings.croppedWidth = 1366;
    this.cropperSettings.croppedHeight = 780;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 200;
    this.cropperSettings.minWidth = 50;
    this.cropperSettings.minHeight = 50;
    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.data = {};
  }

  // showUpload() {
  //   this.show = !this.show;
  // }

  fileChangeListener($event) {
    this.setImage = false;
    this.select = true;
    const image = new Image();
    const file = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  cropped(bounds: Bounds) {
    this.setImage = true;
    this.cropperSettings.croppedHeight = bounds.height;
    this.cropperSettings.croppedWidth = bounds.width;

    const n = this.data.image.search(';base64,');
    const path = '.' + this.data.image.substring(11, n);
    // console.log('path');
    // console.log(path);
    if (path === '.png' || path === '.jpg' || path === '.jpeg') {
      this.onPush.emit(this.data.image);
    } else {
      swal('', 'فرمت تصویر وارد شده صحیح نمی باشد.', 'warning');
      this.setImage = false;
      this.data = {} as any;
    }
  }

}
