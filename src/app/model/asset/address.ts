import {City} from "../baseInformation/city";
import {Province} from "../baseInformation/province";

export class Address {
  id:number;
  city:City=new City();
  province:Province=new Province();
  lat:number;
  lng:number;
  column:string;
  row:string;
  bin:string;
  description:string;
}
