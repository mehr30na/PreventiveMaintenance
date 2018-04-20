import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const routes: Routes = [


  {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
  {path: 'authentication', loadChildren: 'app/feature/auth/auth.module#AuthModule'},
  {path: 'baseInformation', loadChildren: 'app/feature/base-information/base-information.module#BaseInformationModule'},
  {path: 'management', loadChildren: 'app/feature/management/management.module#ManagementModule'},
  {path: 'item', loadChildren: 'app/feature/item/item.module#ItemModule'},
  {path: 'ticket', loadChildren: 'app/feature/ticket/ticket.module#TicketModule'},
  {path: 'net', loadChildren: 'app/feature/net/net.module#NetModule'},
  {path: 'workOrder', loadChildren: 'app/feature/work-order/work-order.module#WorkOrderModule'},
  {path: 'part', loadChildren: 'app/feature/supply/supply.module#SupplyModule'},

  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages', pathMatch: 'full'},


];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, useHash: true})],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},

  ]
})
export class AppRoutingModule {
}
