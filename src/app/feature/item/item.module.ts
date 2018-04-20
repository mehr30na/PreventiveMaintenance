import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';
import { ThemeModule } from "../../@theme/theme.module";
import { DashboardModule } from "../../pages/dashboard/dashboard.module";
import { ItemService } from "../../service/item/item.service";
import { ImageCropperSelfModule } from "../../util-modules/img-cropper/image-cropper-self.module";
import { CategoryService } from "../../service/baseInformation/category.service";
import { SparePartService } from "../../service/management/storeManagement/spare-part.service";
import { MeasurementService } from "../../service/baseInformation/measurement.service";
import { PropertyService } from "../../service/item/property.service";
import { ToastrModule } from "ngx-toastr";
import { TextMaskModule } from "angular2-text-mask";
import { ItemAddFormComponent } from './item-add-form/item-add-form.component';
import { ItemListFormComponent } from './item-list-form/item-list-form.component';
import { BomAddFormComponent } from './bom-add-form/bom-add-form.component';
import { BomListFormComponent } from './bom-list-form/bom-list-form.component';
import { BusinessAddFormComponent } from './business-add-form/business-add-form.component';
import { BusinessListFormComponent } from './business-list-form/business-list-form.component';
import { WarrantyAddFormComponent } from './warranty-add-form/warranty-add-form.component';
import { UserManagementModule } from "../management/user-management/user-management.module";
import { AgmCoreModule } from "@agm/core";
import { MeteringAddFormComponent } from './metering-add-form/metering-add-form.component';
import { BaseInformationModule } from "../base-information/base-information.module";
import { PurchaseAddFormComponent } from './purchase-add-form/purchase-add-form.component';
import { AccountService } from "../../service/asset/account.service";
import { AssetService } from "../../service/asset/asset.service";
import { BusinessService } from "../../service/asset/business.service";
import { BusinessDataService } from "../../service/asset/dataService/business-data.service";
import { MeteringDataService } from "../../service/asset/dataService/metering-data.service";
import { CompanyDataService } from "../../service/asset/dataService/company-data.service";
import { MeasurementDataService } from "../../service/asset/dataService/measurement-data.service";
import { PurchaseDataService } from "../../service/asset/dataService/purchase-data.service";
import { WarrantyDataService } from "../../service/asset/dataService/warranty-data.service";
import { ChargeDepartmentService } from "../../service/asset/charge-department.service";
import { CompanyService } from "../../service/asset/company.service";
import { CurrencyService } from "../../service/asset/currency.service";
import { MeteringService } from "../../service/asset/metering.service";
import { PurchaseService } from "../../service/asset/purchase.service";
import { WarrantyService } from "../../service/asset/warranty.service";
import { AttachmentService } from "../../service/attachment.service";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { TreeTableModule } from 'primeng/treetable';
import {NbValidationModule} from "../../util-modules/nb-validation/nb-validation.module";
import {PartDataService} from "../../service/partAndSupply/dataService/part-data.service";
import {PartService} from "../../service/partAndSupply/part.service";

@NgModule({
  imports: [
    CommonModule,
    // NbValidationModule,
    ItemRoutingModule,
    ThemeModule,
    DashboardModule,
    UserManagementModule,
    BaseInformationModule,
    ImageCropperSelfModule,
    DpDatePickerModule,
    TextMaskModule,
    TreeTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBB7YgTJG5HnVG1WLe51VI38Jb_YwYxDOM',
      libraries: ["places"]
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  declarations: [AddItemComponent, ItemComponent, ItemAddFormComponent, ItemListFormComponent, BomAddFormComponent, BomListFormComponent, BusinessAddFormComponent, BusinessListFormComponent, WarrantyAddFormComponent, MeteringAddFormComponent, PurchaseAddFormComponent],
  providers: [ItemService, CategoryService, SparePartService,
    MeasurementService, PropertyService, AccountService, AssetService, BusinessService,CompanyDataService,
    MeteringDataService, BusinessDataService, CompanyDataService, MeasurementDataService, PurchaseDataService, WarrantyDataService,
    PartDataService,PartService,
    ChargeDepartmentService, CompanyService, CurrencyService, MeteringService, PurchaseService, WarrantyService, AttachmentService],
  exports: [BomAddFormComponent,MeteringAddFormComponent,WarrantyAddFormComponent]
})
export class ItemModule {

}
