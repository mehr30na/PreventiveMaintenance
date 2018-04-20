import {Component} from '@angular/core';
import {MENU_ITEMS} from "../../pages/pages-menu";

@Component({
  selector: 'app-management',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class BaseMotherComponent {
  menu = MENU_ITEMS;
}
