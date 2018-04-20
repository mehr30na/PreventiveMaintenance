import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropperModule} from 'ng2-img-cropper';
import {ImgcropperComponentSelf} from "./image-cropper/imgcropper.component";

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  declarations: [ImgcropperComponentSelf],
  exports: [ImgcropperComponentSelf]

})
export class ImageCropperSelfModule {
}
