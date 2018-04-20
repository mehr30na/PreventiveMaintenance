import {UnitOfMeasurement} from "../baseInformation/unitOfMeasurement";

export class Life {
  id: number;
  useful: number;
  current: number;
  unitOfMeasurement: UnitOfMeasurement = new UnitOfMeasurement();
}
