/**
 * Created by milad on 12/13/17.
 */
import {Province} from "./province";
import {Location} from "../location";

export class City {
  id: number;
  name: string;
  province: Province = new Province();
  location: Location = new Location();
}
