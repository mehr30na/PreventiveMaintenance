import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SupplyRoutingModule} from "./supply-routing.module";
import {ToastrModule} from "ngx-toastr";
import {ThemeModule} from "../../@theme/theme.module";
import {FormsModule} from "@angular/forms";
import {DashboardModule} from "../../pages/dashboard/dashboard.module";
import { SupplyComponent } from './supply/supply.component';
import { AddSupplyComponent } from './add-supply/add-supply.component';
import { ListSupplyComponent } from './list-supply/list-supply.component';
import {ItemModule} from "../item/item.module";
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  imports: [
    CommonModule,
    SupplyRoutingModule,
    ThemeModule,
    DashboardModule,
    ItemModule,
    FormsModule,
    TreeTableModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [SupplyComponent, AddSupplyComponent, ListSupplyComponent]
})
export class SupplyModule { }
