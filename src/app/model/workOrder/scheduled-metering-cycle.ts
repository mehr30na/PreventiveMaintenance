import {UnitOfMeasurement} from "../baseInformation/unitOfMeasurement";

export class ScheduledMeteringCycle {
  id:number;
  per:number;
  startOn:string;
  endOn:string;
  fixType:string;
  unit:UnitOfMeasurement;
}
