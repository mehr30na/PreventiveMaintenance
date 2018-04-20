import {Category} from "../baseInformation/category";
import {SparePart} from "../management/storeManagement/sparePart";
import {Organization} from "../baseInformation/organization";
import {Life} from "./life";
import {Period} from "./period";
import {Image} from "../Image";
// import {Property} from "./property";

export class Item {
  id: number;
  name: string;
  parentItem: Item;
  priority: string;
  life: Life = new Life();
  itemCategory: Category = new Category();
  spareParts: Array<SparePart>;
  itemCheckingPeriod: Period = new Period();
  organization: Organization = new Organization();
  image: Image = new Image();
  imageUrl: string;
  // property: Array<Property>;
}
