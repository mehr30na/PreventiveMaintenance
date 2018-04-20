import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";

@Component({
  selector: 'net',
  templateUrl: './net.component.html',
  styleUrls: ['./net.component.scss']
})
export class NetComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor() {
  }

  ngOnInit() {
  }

}
