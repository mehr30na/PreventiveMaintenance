
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TicketRoutingModule} from './ticket-routing.module';
import {TicketComponent} from './ticket/ticket.component';
import {AddTicketComponent} from './add-ticket/add-ticket.component';
import {ChatComponent} from './chat/chat.component';
import {ListTicketComponent} from './list-ticket/list-ticket.component';
import {DashboardModule} from "../../pages/dashboard/dashboard.module";
import {ThemeModule} from "../../@theme/theme.module";
import {ItemService} from "../../service/item/item.service";
import {TicketService} from "../../service/chat/ticket.service";
import {ChatService} from "../../service/chat/chat.service";
import {ExpertAllocateComponent} from './expert-allocate/expert-allocate.component';
import {UserService} from '../../service/management/userManagement/user.service';
import { MyTicketComponent } from './my-ticket/my-ticket.component';
import {Ng2DragDropModule} from "ng2-drag-drop";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    ThemeModule,
    DashboardModule,
    Ng2DragDropModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    TicketComponent,
    AddTicketComponent,
    ChatComponent,
    ListTicketComponent,
    ExpertAllocateComponent, MyTicketComponent
  ],
  providers: [
    TicketService,
    ItemService,
    ChatService,
    UserService]
})
export class TicketModule {
}
