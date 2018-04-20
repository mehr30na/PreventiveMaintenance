import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";

@Component({
  selector: 'work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit() {
  }

}
