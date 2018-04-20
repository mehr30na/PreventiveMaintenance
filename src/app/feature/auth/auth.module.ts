import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthMotherComponent} from './auth-mother.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignInService} from "../../service/auth/sign-in.service";
import {SignUpService} from "../../service/auth/sign-up.service";
import {OrganService} from "../../service/baseInformation/organ.service";
import {ToastrModule} from "ngx-toastr";
import {ReCaptchaModule} from "angular2-recaptcha";
import { UserService } from '../../service/management/userManagement/user.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReCaptchaModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  declarations: [
    SignInComponent,
    AuthMotherComponent
              ],

  providers: [SignInService, SignUpService, OrganService,UserService]
})
export class AuthModule {
}
