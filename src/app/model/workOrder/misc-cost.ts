import {MiscCostType} from "./misc-cost-type";

export class MiscCost {
  id:number;
  estimatedQuantity:number;
  estimatedUnitCost:number;
  estimatedTotalCost:number;
  quantity:number;
  actualUnitCost:number;
  actualTotalCost:number;
  description:string;
  miscCostType:MiscCostType=new MiscCostType();
}
