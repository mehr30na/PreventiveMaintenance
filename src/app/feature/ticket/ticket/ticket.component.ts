import {Component, OnInit} from '@angular/core';
import {MENU_ITEMS} from "../../../pages/pages-menu";

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  menu = MENU_ITEMS;


  constructor() {
  }

  ngOnInit() {
  }

}
