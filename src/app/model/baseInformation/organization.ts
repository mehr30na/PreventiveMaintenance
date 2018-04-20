/**
 * Created by milad on 12/13/17.
 */
import {Province} from "./province";
import {City} from "./city";
import {Location} from "../location";

export class Organization {
  id: number;
  name: string;
  organCode: string;
  organLocation: Location = new Location();
  parentOrgan: Organization;
  province: Province = new Province();
  city: City = new City();
}
