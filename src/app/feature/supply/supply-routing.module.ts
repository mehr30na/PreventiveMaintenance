import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SupplyComponent} from "./supply/supply.component";
import {AddSupplyComponent} from "./add-supply/add-supply.component";
import {ListSupplyComponent} from "./list-supply/list-supply.component";

const routes: Routes = [
  {
    path: '', component: SupplyComponent, children: [
    {path: 'addSupply', component: AddSupplyComponent},
    {path: 'listSupply', component: ListSupplyComponent},

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyRoutingModule {
}
