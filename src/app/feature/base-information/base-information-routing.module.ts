import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {CityListComponent} from "./city/city-list/city-list.component";
import {MeasurementListComponent} from "./measurement/measurement-list/measurement-list.component";
import {OrganizationListComponent} from "./organization/organization-list/organization-list.component";
import {ProvinceListComponent} from "./province/province-list/province-list.component";
import {BaseMotherComponent} from "./baseMother.component";

const routes: Routes = [
  {
    path: '', component: BaseMotherComponent, children: [
    {path: 'listCategory', component: CategoryListComponent},
    {path: 'listCity', component: CityListComponent},
    {path: 'listMeasurement', component: MeasurementListComponent},
    {path: 'listOrganization', component: OrganizationListComponent},
    {path: 'listProvince', component: ProvinceListComponent},
  ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseInformationRoutingModule {
}
