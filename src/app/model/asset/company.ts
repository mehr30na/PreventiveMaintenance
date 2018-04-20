import {Image} from "../Image";
import {Address} from "./address";
import {Document} from "../document";
import {Asset} from "./asset";
import {User} from "../management/userManagement/user";
import {Currency} from "./currency";

export class Company {
  id:number;
  name:string;
  code:string;
  image:Image=new Image();
  phoneNumber:string;
  email:string;
  webSite:string;
  fax:string;
  description:string;
  address:Address=new Address();
  currency:Currency=new Currency();
  documents:Array<Document>;
  assets:Array<Asset>;
  users:Array<User>
}
