import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from "./user/user-list/user-list.component";
import {RoleAddComponent} from "./role/role-add/role-add.component";
import {RoleListComponent} from "./role/role-list/role-list.component";
import {ManagementMotherComponent} from "./management-mother.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";

const routes: Routes = [
  {
    path: '', component: ManagementMotherComponent, children: [
    {path: 'listUser', component: UserListComponent},
    {path: 'listUser/:mode', component: UserListComponent},
    {path: 'addRole', component: RoleAddComponent},
    {path: 'listRole', component: RoleListComponent},
    {path: 'detail/:id', component: UserDetailComponent},
  ]


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {
}
