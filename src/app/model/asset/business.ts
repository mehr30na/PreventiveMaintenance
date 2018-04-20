import {Company} from "./company";

export class Business {
  id:number;
  name:string;
  company:Company=new Company();
  type:string;
  suggest:boolean;
}
