import {User} from "../management/userManagement/user";

export class WorkOrderTasks {
  id:number;
  name:string;
  timeEstimatedHour:number;
  timeSpantHours:number;
  description:string;
  taskCompletion:string;
  dateCompleted:string;
  startDate:string;
  type:string;
  assignToUser:User=new User();
  completedByUser:User=new User();
}
