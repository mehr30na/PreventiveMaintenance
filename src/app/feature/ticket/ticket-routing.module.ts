import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TicketComponent} from "./ticket/ticket.component";
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {ListTicketComponent} from "./list-ticket/list-ticket.component";
import {ChatComponent} from "./chat/chat.component";
import {ExpertAllocateComponent} from "./expert-allocate/expert-allocate.component";
import {MyTicketComponent} from "./my-ticket/my-ticket.component";

const routes: Routes = [
  {
    path: '', component: TicketComponent, children: [
    {path: 'addTicket', component: AddTicketComponent},
    {path: 'listTicket', component: ListTicketComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'myTicket', component: MyTicketComponent},
    {path: 'chat/:ticketId', component: ChatComponent},
    {path: 'expert-allocate', component: ExpertAllocateComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
