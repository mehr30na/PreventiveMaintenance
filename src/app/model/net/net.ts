import {User} from "../management/userManagement/user";
import {Ticket} from "../ticket/ticket";
import {SparePart} from "../management/storeManagement/sparePart";
import {Document} from "../document";

export class Net {
  id: number;
  expert: User = new User();
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ticket: Ticket = new Ticket();
  documents: Array<Document>;
  spareParts: Array<SparePart>;
}
