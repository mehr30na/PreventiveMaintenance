import {UnitOfMeasurement} from "../baseInformation/unitOfMeasurement";
import {Account} from "./account";
import {ChargeDepartment} from "./charge-department";
import {Image} from "../Image";
import {User} from "../management/userManagement/user";
import {Metering} from "./metering";
import {Warranty} from "./warranty";
import {Document} from "../document";

export class Part {
  id:number;
  name:string;
  quantity:number;
  minQuantity:number;
  lastPrice:number;
  code:string;
  description:string;
  brand:string;
  inventoryCode:string;
  note:string;
  unit:UnitOfMeasurement=new UnitOfMeasurement();
  account:Account=new Account();
  chargeDepartement:ChargeDepartment=new ChargeDepartment();
  image:Image=new Image();
  parts:Array<Part>;
  users:Array<User>;
  meterings:Array<Metering>;
  warranties:Array<Warranty>;
  documents:Array<Document>;

}
