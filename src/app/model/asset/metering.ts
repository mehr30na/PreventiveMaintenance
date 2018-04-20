import {UnitOfMeasurement} from "../baseInformation/unitOfMeasurement";

export class Metering{
  id:number;
  name:string;
  unit:UnitOfMeasurement=new UnitOfMeasurement();
  amount:number;
  description:string;
}
