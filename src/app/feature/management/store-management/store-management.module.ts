import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StoreManagementRoutingModule} from './store-management-routing.module';
import {SparePartAddComponent} from './spare-part-add/spare-part-add.component';
import {StoreManagementMotherComponent} from "./storeManagement-mother.component";
import {ThemeModule} from "../../../@theme/theme.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SparePartService} from "../../../service/management/storeManagement/spare-part.service";
import {AttachmentModule} from "../../../util-modules/attachment/attachment.module";
import {ImageCropperSelfModule} from "../../../util-modules/img-cropper/image-cropper-self.module";
import {CollectorAddComponent} from './collector-add/collector-add.component';
import {PurchasingResourcesAddComponent} from './purchasing-resources-add/purchasing-resources-add.component';
import {PurchasingResourcesService} from "../../../service/management/storeManagement/purchasing-resources.service";
import {CollectorService} from "../../../service/management/storeManagement/collector.service";
import {NewSparePartService} from "../../../service/management/storeManagement/new-spare-part.service";
import {ToastrModule} from "ngx-toastr";
import {DocumentService} from "../../../service/document.service";

@NgModule({
  imports: [
    CommonModule,
    StoreManagementRoutingModule,
    ThemeModule,
    AttachmentModule,
    ImageCropperSelfModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [SparePartAddComponent, StoreManagementMotherComponent, CollectorAddComponent, PurchasingResourcesAddComponent],
  providers: [SparePartService, NewSparePartService, PurchasingResourcesService, CollectorService,DocumentService]
})
export class StoreManagementModule {
}
