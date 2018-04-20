import {Category} from "../baseInformation/category";
import {Image} from "../Image";
import {Warranty} from "./warranty";
import {Business} from "./business";
import {Property} from "./property";
import {Address} from "./address";
import {Account} from "./account";
import {ChargeDepartment} from "./charge-department";
import {Metering} from "./metering";
import {Document} from "../document";
import {Purchase} from "./purchase";
import {Part} from "./part";

export class Asset {
  id:number;
  name:string;
  description:string;
  code:string;
  status:boolean;
  chargeDepartment:ChargeDepartment=new ChargeDepartment();
  address:Address=new Address();
  category:Category=new Category();
  image:Image=new Image();
  assets:Array<Asset>;
  warranties:Array<Warranty>;
  meterings:Array<Metering>;
  businesses:Array<Business>;
  properties:Array<Property>;
  documents:Array<Document>;
  purchase:Array<Purchase>;
  parts:Array<Part>;
  note:string;
  account:Account=new Account();
  parentId:number;

}
