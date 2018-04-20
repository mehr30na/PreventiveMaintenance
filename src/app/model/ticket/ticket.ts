import {Item} from "../item/item";
import {User} from "../management/userManagement/user";
import {StatusTicket} from "../../base/helper/enum/ticket/statusTicket";

export class Ticket {
  id: number;
  title: string;
  item: Item = new Item();
  experts: Array<User>;
  user: User = new User();
  chat: string;
  description: string;
  submitDate: string;
  ticketStatus: string;
  // enum

}
