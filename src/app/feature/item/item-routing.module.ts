import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemComponent} from "./item/item.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {ItemAddFormComponent} from "./item-add-form/item-add-form.component";
import { ItemListFormComponent } from './item-list-form/item-list-form.component';

const routes: Routes = [
  {
    path: '', component: ItemComponent, children: [
    {path: 'addItem', component: AddItemComponent},
    {path: 'addAsset', component:ItemAddFormComponent},
    {path: 'addAsset/:categoryId', component:ItemAddFormComponent},
    {path: 'addAsset/:assetId', component:ItemAddFormComponent},
    {path: 'listAsset', component:ItemListFormComponent},


  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
