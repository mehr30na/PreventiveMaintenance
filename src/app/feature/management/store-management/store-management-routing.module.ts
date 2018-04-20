import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreManagementMotherComponent} from "./storeManagement-mother.component";
import {SparePartAddComponent} from "./spare-part-add/spare-part-add.component";
import {CollectorAddComponent} from "./collector-add/collector-add.component";
import {PurchasingResourcesAddComponent} from "./purchasing-resources-add/purchasing-resources-add.component";

const routes: Routes = [
  {
    path: '', component: StoreManagementMotherComponent, children: [
    {path: 'addSpare', component: SparePartAddComponent},
    {path: 'addCollector', component: CollectorAddComponent},
    {path: 'addPurchasingResources', component: PurchasingResourcesAddComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreManagementRoutingModule {
}
