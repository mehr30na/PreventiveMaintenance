import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ManagementComponent} from "./management.component";

const routes: Routes = [

  {
    path: 'userManagement',
    loadChildren: 'app/feature/management/user-management/user-management.module#UserManagementModule'
  },
  {
    path: 'storeManagement',
    loadChildren: 'app/feature/management/store-management/store-management.module#StoreManagementModule'
  },
  {path: '', component: ManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
