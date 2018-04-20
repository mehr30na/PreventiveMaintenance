import {PurchasingResources} from "./purchasingResources";
import {SparePart} from "./sparePart";
import {Collector} from "./collector";

export class StoreHouse {
  id: number;
  storeHousePurchasingResources: Array<PurchasingResources>;
  storeHouseCollectors: Array<Collector>;
  spareParts: Array<SparePart>
}
