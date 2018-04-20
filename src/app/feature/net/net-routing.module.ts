import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NetComponent} from "./net/net.component";
import {AddNetComponent} from "./add-net/add-net.component";

const routes: Routes = [
  {
    path: '', component: NetComponent, children: [
    {path: 'addNet', component: AddNetComponent},

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetRoutingModule {
}
