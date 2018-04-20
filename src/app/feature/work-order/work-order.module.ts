import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkOrderRoutingModule} from "./work-order-routing.module";
import { WorkOrderComponent } from './work-order/work-order.component';
import { AddWorkOrderComponent } from './add-work-order/add-work-order.component';
import { ListWorkOrderComponent } from './list-work-order/list-work-order.component';
import {DpDatePickerModule} from "ng2-jalali-date-picker";
import {DashboardModule} from "../../pages/dashboard/dashboard.module";
import {ToastrModule} from "ngx-toastr";
import {ThemeModule} from "../../@theme/theme.module";
import {ItemModule} from "../item/item.module";
import {AccountService} from "../../service/asset/account.service";
import {PartService} from "../../service/partAndSupply/part.service";
import {MeasurementService} from "../../service/baseInformation/measurement.service";
import {AssetService} from "../../service/asset/asset.service";
import {MiscCostService} from "../../service/workOrder/misc-cost.service";
import {AttachmentService} from "../../service/attachment.service";
import {MiscCostTypeService} from "../../service/workOrder/misc-cost-type.service";
import {WorkOrderStatusService} from "../../service/workOrder/work-order-status.service";
import {UserService} from "../../service/management/userManagement/user.service";
import {WorkOrderPartService} from "../../service/workOrder/work-order-part.service";
import {MeteringDataService} from "../../service/asset/dataService/metering-data.service";
import {NotifyService} from "../../service/workOrder/notify.service";
import {ChargeDepartmentService} from "../../service/asset/charge-department.service";
import {WorkOrderService} from "../../service/workOrder/work-order.service";
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderRoutingModule,
    ThemeModule,
    DashboardModule,
    ItemModule,
    DpDatePickerModule,
    TreeTableModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [WorkOrderComponent, AddWorkOrderComponent, ListWorkOrderComponent],
  providers:[WorkOrderStatusService,AttachmentService,AccountService,AssetService,UserService,PartService,WorkOrderPartService,MeteringDataService,
    MeasurementService,MiscCostService,MiscCostTypeService,NotifyService,ChargeDepartmentService,WorkOrderService]
})

export class WorkOrderModule { }
