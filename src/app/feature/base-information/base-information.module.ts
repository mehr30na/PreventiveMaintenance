import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BaseInformationRoutingModule} from './base-information-routing.module';
import {ProvinceListComponent} from './province/province-list/province-list.component';
import {OrganizationListComponent} from './organization/organization-list/organization-list.component';
import {CityListComponent} from './city/city-list/city-list.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {MeasurementListComponent} from './measurement/measurement-list/measurement-list.component';
import {AgmCoreModule} from "@agm/core";
import {ProvinceService} from "../../service/baseInformation/province.service";
import {ProvinceDataService} from "./province/province-data.service";
import {BaseMotherComponent} from "./baseMother.component";
import {ThemeModule} from "../../@theme/theme.module";
import {DashboardModule} from "../../pages/dashboard/dashboard.module";
import {CityService} from "../../service/baseInformation/city.service";
import {OrganService} from "../../service/baseInformation/organ.service";
import {MeasurementService} from "../../service/baseInformation/measurement.service";
import {CategoryService} from "../../service/baseInformation/category.service";
import {UserService} from "../../service/management/userManagement/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {MeasurementDataService} from "../../service/asset/dataService/measurement-data.service";

@NgModule({
  imports: [
    CommonModule,
    BaseInformationRoutingModule,
    // AgmCoreModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBB7YgTJG5HnVG1WLe51VI38Jb_YwYxDOM',
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    DashboardModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    ProvinceListComponent,
    OrganizationListComponent,
    CityListComponent,
    CategoryListComponent,
    MeasurementListComponent,
    BaseMotherComponent],
  providers: [ProvinceService, ProvinceDataService, CityService, OrganService, CategoryService, MeasurementService, UserService,MeasurementDataService],
  exports:[MeasurementListComponent]
})
export class BaseInformationModule {
}
