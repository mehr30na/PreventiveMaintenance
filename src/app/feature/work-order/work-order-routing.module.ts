import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkOrderComponent} from "./work-order/work-order.component";
import {AddWorkOrderComponent} from "./add-work-order/add-work-order.component";
import {ListWorkOrderComponent} from "./list-work-order/list-work-order.component";

const routes: Routes = [
  {
    path: '', component: WorkOrderComponent, children: [
    {path: 'addWorkOrder', component: AddWorkOrderComponent},
    {path: 'listWorkOrder', component: ListWorkOrderComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule {
}
