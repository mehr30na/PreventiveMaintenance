import {Part} from "../asset/part";

export class WorkOrderParts {
  id:number;
  planedQuantity:number;
  actualQuantity:number;
  part:Part=new Part();
}
