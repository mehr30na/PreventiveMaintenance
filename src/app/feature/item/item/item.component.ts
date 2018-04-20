import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() {
  }

  ngOnInit() {
  }

}
