import {User} from "../management/userManagement/user";
import {Ticket} from "../ticket/ticket";
import {Document} from "../document";
import {Location} from "../location";

export class Chat {

  id: number;
  from: User = new User();
  fromId: number;
  fromUserName: string;
  date: number;
  ticket: Ticket = new Ticket();
  reply: Chat;
  replyId: number;
  text: String;
  document: Document = new Document();
  location: Location = new Location();
  seen: boolean;


}
