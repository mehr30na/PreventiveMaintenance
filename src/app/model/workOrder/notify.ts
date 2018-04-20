import {User} from "../management/userManagement/user";
// import {NotifyEvent} from "./enum/notify-event.enum";

export class Notify {
  id:number;
  user:User=new User();
  events:Array<string>
}
