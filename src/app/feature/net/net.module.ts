import { DocumentService } from './../../service/document.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NetRoutingModule} from './net-routing.module';
import {NetComponent} from './net/net.component';
import {AddNetComponent} from './add-net/add-net.component';
import {ThemeModule} from "../../@theme/theme.module";
import {DashboardModule} from "../../pages/dashboard/dashboard.module";
import {FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {NetService} from "../../service/net/net.service";
import {SparePartService} from "../../service/management/storeManagement/spare-part.service";
import {TicketService} from "../../service/chat/ticket.service";
import {AttachmentService} from "../../service/attachment.service";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    CommonModule,
    NetRoutingModule,
    ThemeModule,
    DashboardModule,
    FormsModule,
    TextMaskModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [NetComponent, AddNetComponent],
  providers: [NetService, SparePartService, TicketService, AttachmentService,DocumentService]
})
export class NetModule {
}
