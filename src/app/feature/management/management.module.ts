import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ManagementRoutingModule} from './management-routing.module';
import {ThemeModule} from "../../@theme/theme.module";
import {ManagementComponent} from "./management.component";
import {DashboardModule} from "../../pages/dashboard/dashboard.module";

const MANAGEMENT_COMPONENTS = [
  ManagementComponent
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ManagementRoutingModule,
    DashboardModule,
  ],
  declarations: [
    ...MANAGEMENT_COMPONENTS
  ]
})
export class ManagementModule {
}
