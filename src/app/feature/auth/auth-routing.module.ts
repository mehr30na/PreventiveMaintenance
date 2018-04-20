import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthMotherComponent} from "./auth-mother.component";

const routes: Routes = [
  {path: '', redirectTo: 'signIn', pathMatch: 'full'},
  {
    path: '', component: AuthMotherComponent, children: [
    {path: 'signIn', component: SignInComponent},
  ]
  },
  {path: 'signIn', component: SignInComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
