import {Contact} from "../../contact";
import {Image} from "../../Image";
import {UserType} from "./userType";
import {Ticket} from "../../ticket/ticket";
import {Organization} from "../../baseInformation/organization";

/**
 * Created by milad on 12/17/17.
 */
export class User {
  id: number;
  name: string;
  family: string;
  fatherName: string;
  nationalCode: string;
  birthDay: Date;
  startWork: Date;
  userName: string;
  password: string;
  userType: UserType = new UserType();
  userContact: Contact = new Contact();
  image: Image = new Image();
  imageUrl: string;
  userTicketes: Ticket[];
  organization: Organization = new Organization();
}
