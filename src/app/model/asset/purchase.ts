import {Business} from "./business";
import {Currency} from "./currency";

export class Purchase {
  id:number;
  price:number;
  business:Business=new Business();
  currency:Currency=new Currency();
  deliverDate:string;
  purchaseDate:string;
}
