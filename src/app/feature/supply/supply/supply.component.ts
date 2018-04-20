import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";

@Component({
  selector: 'supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit() {
  }

}
