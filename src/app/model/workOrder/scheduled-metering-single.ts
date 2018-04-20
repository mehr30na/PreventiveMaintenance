import {UnitOfMeasurement} from "../baseInformation/unitOfMeasurement";

export class ScheduledMeteringSingle {
  id:number;
  per:number;
  compare:string;
  unit:UnitOfMeasurement=new UnitOfMeasurement();
}
