import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserManagementRoutingModule} from './user-management-routing.module';
import {RoleAddComponent} from './role/role-add/role-add.component';
import {RoleListComponent} from './role/role-list/role-list.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {ManagementMotherComponent} from "./management-mother.component";
import {ThemeModule} from "../../../@theme/theme.module";
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImageCropperSelfModule} from "../../../util-modules/img-cropper/image-cropper-self.module";
import {UserService} from "../../../service/management/userManagement/user.service";
import {RoleService} from "../../../service/management/userManagement/role.service";
import {UserDataService} from "./user/user-data.service";
import {RoleDataService} from "./role/role-data.service";
import {OrganService} from "../../../service/baseInformation/organ.service";
import {ImageService} from "../../../service/management/userManagement/image.service";
import {ToastrModule} from "ngx-toastr";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
    ImageCropperSelfModule,
    TextMaskModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    RoleAddComponent,
    RoleListComponent,
    UserListComponent,
    ManagementMotherComponent,
    UserDetailComponent
  ],
  providers: [UserService, RoleService, UserDataService, RoleDataService, OrganService, ImageService],
  exports:[UserListComponent]
})
export class UserManagementModule {
}
