import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";


@Component({
  selector: 'app-management-mother',
  template: `    
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class StoreManagementMotherComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() {
  }

  ngOnInit() {
  }

}
