import {PurchasingResources} from "./purchasingResources";
import {Document} from "../../document";
import {Image} from "../../Image";
import {Collector} from "./collector";

export class SparePart {
  id: number;
  name: string;
  purchasingResources: PurchasingResources = new PurchasingResources();
  collector: Collector = new Collector();
  cost: number;
  sparePartDocuments: Array<Document>;
  // image:Image=new Image();
}
