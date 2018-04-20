"use strict";
var __extends = (this && this.__extends) || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ng2_img_cropper_1 = require("ng2-img-cropper");
var ImgcropperComponentSelf = (function (_super) {
  __extends(ImgcropperComponentSelf, _super);

  function ImgcropperComponentSelf() {
    var _this = _super.call(this) || this;
    _this.onPush = new core_1.EventEmitter();
    _this.cropperSettings1 = new ng2_img_cropper_1.CropperSettings();
    _this.cropperSettings1.width = 200;
    _this.cropperSettings1.height = 200;
    _this.cropperSettings1.croppedWidth = 100;
    _this.cropperSettings1.croppedHeight = 100;
    _this.cropperSettings1.canvasWidth = 300;
    _this.cropperSettings1.canvasHeight = 100;
    _this.cropperSettings1.minWidth = 100;
    _this.cropperSettings1.minHeight = 100;
    _this.cropperSettings1.rounded = false;
    _this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    _this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
    _this.data1 = {};
    //Cropper settings 2
    _this.cropperSettings2 = new ng2_img_cropper_1.CropperSettings();
    _this.cropperSettings2.width = 200;
    _this.cropperSettings2.height = 200;
    _this.cropperSettings2.keepAspect = false;
    _this.cropperSettings2.croppedWidth = 200;
    _this.cropperSettings2.croppedHeight = 200;
    _this.cropperSettings2.canvasWidth = 500;
    _this.cropperSettings2.canvasHeight = 300;
    _this.cropperSettings2.minWidth = 100;
    _this.cropperSettings2.minHeight = 100;
    _this.cropperSettings2.rounded = true;
    _this.cropperSettings2.minWithRelativeToResolution = false;
    _this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    _this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    _this.cropperSettings2.noFileInput = true;
    _this.data2 = {};
    return _this;
  }

  ImgcropperComponentSelf.prototype.ngOnInit = function () {
  };
  ImgcropperComponentSelf.prototype.cropped = function (bounds) {
    this.onPush.emit(this.data1.questionImage);
    //console.log(bounds);
  };
  /**
   * Used to send questionImage to second cropper
   * @param $event
   */
  ImgcropperComponentSelf.prototype.fileChangeListener = function ($event) {
    var image = new Image();
    var file = $event.target.files[0];
    var myReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  };
  return ImgcropperComponentSelf;
}(core_1.Type));
__decorate([
  core_1.Output(),
  __metadata("design:type", Object)
], ImgcropperComponentSelf.prototype, "onPush", void 0);
__decorate([
  core_1.ViewChild('cropper', undefined),
  __metadata("design:type", typeof (_a = typeof ng2_img_cropper_1.ImageCropperComponent !== "undefined" && ng2_img_cropper_1.ImageCropperComponent) === "function" && _a || Object)
], ImgcropperComponentSelf.prototype, "cropper", void 0);
ImgcropperComponentSelf = __decorate([
  core_1.Component({
    selector: 'app-imgcropper',
    templateUrl: 'app/imgcropper/imgcropper.component.html',
  }),
  __metadata("design:paramtypes", [])
], ImgcropperComponentSelf);
exports.ImgcropperComponentSelf = ImgcropperComponentSelf;
var _a;
//# sourceMappingURL=imgcropper.component.js.map
