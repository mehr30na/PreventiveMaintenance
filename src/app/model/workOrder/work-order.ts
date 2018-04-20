import {WorkOrderStatus} from "./work-order-status";
import {Asset} from "../asset/asset";
import {Account} from "../asset/account";
import {ChargeDepartment} from "../asset/charge-department";
import {User} from "../management/userManagement/user";
import {ScheduledTime} from "./scheduled-time";
import {ScheduledMeteringCycle} from "./scheduled-metering-cycle";
import {ScheduledMeteringSingle} from "./scheduled-metering-single";
import {WorkOrderTasks} from "./work-order-tasks";
import {WorkOrderParts} from "./work-order-parts";
import {Metering} from "../asset/metering";
import {MiscCost} from "./misc-cost";
import {Notify} from "./notify";
import {Document} from "../document";
import {Image} from "../Image";

export class WorkOrder {
  id:number;
  name:string;
  laborHour:number;
  actualLaborHour:number;
  completionDate:string;
  requiredCompletionDate:string;
  issueSummary:string;
  workInstruction:string;
  note:string;
  problem:string;
  rootCause:string;
  solution:string;
  adminNote:string;
  priority:string;
  maintenanceType:string;
  status:WorkOrderStatus=new WorkOrderStatus();
  asset:Asset=new Asset();
  image:Image=new Image();
  account:Account=new Account();
  chargeDepartment:ChargeDepartment=new ChargeDepartment();
  userAssigned:User=new User();
  completedUser:User=new User();
  scheduledTime:ScheduledTime=new ScheduledTime();
  meteringCycle:ScheduledMeteringCycle=new ScheduledMeteringCycle();
  meteringSingle:ScheduledMeteringSingle=new ScheduledMeteringSingle();
  workOrderTasks:Array<WorkOrderTasks>;
  workOrderParts:Array<WorkOrderParts>;
  meterReadings:Array<Metering>;
  miscCosts:Array<MiscCost>;
  notifications:Array<Notify>;
  documents:Array<Document>
}
