import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AttachmentComponent} from "./attachment.component";
import {CommonModule} from "@angular/common";
import {AttachmentService} from "../../service/attachment.service";


@NgModule({
  declarations: [
    AttachmentComponent
  ],
  imports: [
    CommonModule

  ],
  providers: [
    AttachmentService
  ],
  exports: [
    AttachmentComponent
  ]
})
export class AttachmentModule {
}
